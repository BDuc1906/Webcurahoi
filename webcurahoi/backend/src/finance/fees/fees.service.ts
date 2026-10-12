import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Certificate, FeeUnit, Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { env } from '../../config/env';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateDocumentInput,
  UpsertFeeScheduleInput,
  UpsertObligationInput,
  UpsertUnitInput,
} from './fees.schemas';

const DAY_MS = 86_400_000;

@Injectable()
export class FeesService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================================ Trụ cột 1
  /** Biểu mức phí và hội phí. */
  async listSchedules() {
    const rows = await this.prisma.feeSchedule.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return rows.map((s) => ({
      code: s.code,
      name: s.name,
      category: s.category,
      targetGroup: s.targetGroup,
      minAmount: s.minAmount == null ? null : Number(s.minAmount),
      maxAmount: s.maxAmount == null ? null : Number(s.maxAmount),
      note: s.note,
      effectiveFrom: s.effectiveFrom,
    }));
  }

  /** Kho văn bản pháp quy về tài chính. */
  async listDocuments() {
    return this.prisma.financeDocument.findMany({
      where: { isPublic: true },
      orderBy: [{ issuedDate: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, code: true, title: true, docType: true, issuedDate: true, fileUrl: true },
    });
  }

  // ============================================================ Trụ cột 2
  private async requireUnit(code: string): Promise<FeeUnit> {
    const unit = await this.prisma.feeUnit.findUnique({ where: { code: code.toUpperCase() } });
    if (!unit || !unit.active) throw new NotFoundException(`Không tìm thấy đơn vị có mã ${code}`);
    return unit;
  }

  /** Tra cứu tình trạng hội phí theo Mã đơn vị + thông báo nhắc nợ. */
  async getUnitStatus(code: string) {
    const unit = await this.requireUnit(code);
    const obligations = await this.prisma.feeObligation.findMany({
      where: { unitId: unit.id },
      orderBy: { year: 'desc' },
    });

    const rows = obligations.map((o) => ({
      year: o.year,
      status: o.status,
      amountDue: Number(o.amountDue),
      amountPaid: Number(o.amountPaid),
      amountRemaining: Math.max(0, Number(o.amountDue - o.amountPaid)),
      dueDate: o.dueDate,
      paidAt: o.paidAt,
    }));

    const outstanding = rows.filter((r) => r.status === 'UNPAID' || r.status === 'PARTIAL');
    const totalOutstanding = outstanding.reduce((sum, r) => sum + r.amountRemaining, 0);

    const year = new Date().getFullYear();
    const deadline = new Date(`${year}-${env.SETTLEMENT_DEADLINE}T23:59:59+07:00`);
    const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / DAY_MS);
    const current = rows.find((r) => r.year === year);
    const reminder =
      current && current.amountRemaining > 0
        ? {
            year,
            deadline,
            daysLeft: Math.max(0, daysLeft),
            overdue: daysLeft < 0,
            amountRemaining: current.amountRemaining,
            message:
              daysLeft >= 0
                ? `Thông báo: Còn ${daysLeft} ngày nữa đến kỳ quyết toán hội phí năm ${year} của Trung ương Hội.`
                : `Thông báo: Đã quá hạn quyết toán hội phí năm ${year} của Trung ương Hội.`,
          }
        : null;

    return {
      unit: { code: unit.code, name: unit.name, unitType: unit.unitType, province: unit.province },
      status: outstanding.length === 0 ? 'COMPLETED' : 'INCOMPLETE',
      statusLabel: outstanding.length === 0 ? 'Đã hoàn thành' : 'Chưa hoàn thành',
      paidYears: rows.filter((r) => r.status === 'PAID').map((r) => r.year),
      outstanding,
      totalOutstanding,
      reminder,
      obligations: rows,
    };
  }

  /** Kho lưu trữ lịch sử đóng phí của đơn vị. */
  async getUnitPayments(code: string) {
    const unit = await this.requireUnit(code);
    const rows = await this.prisma.paymentTransaction.findMany({
      where: { unitId: unit.id, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
    });
    return rows.map((t) => ({
      code: t.code,
      purpose: t.purpose,
      amount: Number(t.amount),
      method: t.method,
      bankGateway: t.bankGateway,
      completedAt: t.completedAt,
    }));
  }

  // ---------------------------------------------------------- Chứng nhận
  private toCertificateDto(c: Certificate, unit: Pick<FeeUnit, 'code' | 'name'>) {
    return {
      code: c.code,
      verifyCode: c.verifyCode,
      verifyUrl: `${env.WEB_BASE_URL}/xac-thuc/${c.verifyCode}`,
      title: `Giấy chứng nhận đã hoàn thành nghĩa vụ hội viên năm ${c.year}`,
      unit: { code: unit.code, name: unit.name },
      year: c.year,
      issuedAt: c.issuedAt,
      issuedBy: c.issuedBy,
    };
  }

  async getCertificate(code: string, year: number) {
    const unit = await this.requireUnit(code);
    const cert = await this.prisma.certificate.findUnique({ where: { unitId_year: { unitId: unit.id, year } } });
    if (!cert) throw new NotFoundException(`Đơn vị chưa được cấp chứng nhận năm ${year}`);
    return this.toCertificateDto(cert, unit);
  }

  /** Công khai: quét mã QR trên chứng nhận để xác thực. */
  async verifyCertificate(verifyCode: string) {
    const cert = await this.prisma.certificate.findUnique({
      where: { verifyCode: verifyCode.toUpperCase() },
      include: { unit: { select: { code: true, name: true } } },
    });
    if (!cert) return { valid: false as const };
    return { valid: true as const, ...this.toCertificateDto(cert, cert.unit) };
  }

  // ============================================================ Quản trị
  async issueCertificate(code: string, year: number, issuedBy?: string) {
    const unit = await this.requireUnit(code);
    const ob = await this.prisma.feeObligation.findUnique({ where: { unitId_year: { unitId: unit.id, year } } });
    if (!ob) throw new NotFoundException(`Đơn vị chưa có nghĩa vụ hội phí năm ${year}`);
    if (ob.status !== 'PAID') throw new ConflictException('Đơn vị chưa hoàn thành nghĩa vụ hội phí năm này');

    const existing = await this.prisma.certificate.findUnique({ where: { obligationId: ob.id } });
    if (existing) return this.toCertificateDto(existing, unit);

    const cert = await this.prisma.certificate.create({
      data: {
        code: `CN-${year}-${unit.code}`,
        verifyCode: randomBytes(8).toString('hex').toUpperCase(),
        unitId: unit.id,
        year,
        obligationId: ob.id,
        issuedBy,
      },
    });
    return this.toCertificateDto(cert, unit);
  }

  async upsertSchedule(code: string, input: UpsertFeeScheduleInput) {
    const data = {
      name: input.name,
      category: input.category,
      targetGroup: input.targetGroup,
      minAmount: input.minAmount === undefined ? null : BigInt(input.minAmount),
      maxAmount: input.maxAmount === undefined ? null : BigInt(input.maxAmount),
      note: input.note,
      effectiveFrom: input.effectiveFrom,
      active: input.active,
      sortOrder: input.sortOrder,
    };
    const s = await this.prisma.feeSchedule.upsert({ where: { code }, create: { code, ...data }, update: data });
    return { code: s.code };
  }

  async createDocument(input: CreateDocumentInput) {
    const d = await this.prisma.financeDocument.create({ data: input });
    return { id: d.id };
  }

  async upsertUnit(code: string, input: UpsertUnitInput) {
    const data = {
      name: input.name,
      unitType: input.unitType,
      province: input.province,
      contactEmail: input.contactEmail,
      annualFee: input.annualFee === undefined ? null : BigInt(input.annualFee),
      externalOrgId: input.externalOrgId,
      active: input.active,
    };
    const u = await this.prisma.feeUnit.upsert({ where: { code }, create: { code, ...data }, update: data });
    return { code: u.code };
  }

  async upsertObligation(unitCode: string, input: UpsertObligationInput) {
    const unit = await this.requireUnit(unitCode);
    const dueDate = new Date(`${input.year}-${env.SETTLEMENT_DEADLINE}T23:59:59+07:00`);
    const ob = await this.prisma.feeObligation.upsert({
      where: { unitId_year: { unitId: unit.id, year: input.year } },
      create: { unitId: unit.id, year: input.year, amountDue: BigInt(input.amountDue), dueDate, status: input.status },
      update: { amountDue: BigInt(input.amountDue), ...(input.status ? { status: input.status } : {}) },
    });
    return { unit: unit.code, year: ob.year, amountDue: Number(ob.amountDue), status: ob.status };
  }

  /** Tạo nghĩa vụ hội phí năm cho mọi đơn vị có khai báo mức niên liễm (bỏ qua đơn vị đã có). */
  async generateObligations(year: number) {
    const units = await this.prisma.feeUnit.findMany({ where: { active: true, annualFee: { not: null } } });
    const dueDate = new Date(`${year}-${env.SETTLEMENT_DEADLINE}T23:59:59+07:00`);
    const data: Prisma.FeeObligationCreateManyInput[] = units.map((u) => ({
      unitId: u.id,
      year,
      amountDue: u.annualFee!,
      dueDate,
    }));
    const result = await this.prisma.feeObligation.createMany({ data, skipDuplicates: true });
    return { year, created: result.count, totalUnits: units.length };
  }
}
