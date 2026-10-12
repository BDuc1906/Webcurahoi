/**
 * Dữ liệu mẫu theo file duc.txt (chiến dịch, biểu mức phí, đơn vị ví dụ).
 * Giao dịch mẫu có note = "SEED_DEMO" để xóa dễ dàng trước khi chạy thật:
 *   DELETE FROM fin_transactions WHERE note = 'SEED_DEMO';
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const M = 1_000_000;
const year = new Date().getFullYear();
const dueDate = (y: number) => new Date(`${y}-12-31T23:59:59+07:00`);

const DONORS = [
  'Công ty Dược Hà Thành (mẫu)',
  'Chi hội Đà Nẵng (mẫu)',
  'Nguyễn Văn An (mẫu)',
  'Bệnh viện Mắt Sài Gòn (mẫu)',
  'Trần Thị Bình (mẫu)',
  'Doanh nghiệp Áo Vua (mẫu)',
  'Lê Minh Châu (mẫu)',
  'Phòng khám Tâm Đức (mẫu)',
  'Phạm Quốc Dũng (mẫu)',
  'Viện Y Sinh Học 01 (mẫu)',
];

async function seedCampaigns() {
  const campaigns = [
    {
      slug: 'anh-sang-cong-dong',
      name: 'Ánh sáng Cộng đồng - Mổ mắt Phaco cho người cao tuổi nghèo',
      description: 'Quỹ hỗ trợ phẫu thuật đục thủy tinh thể bằng phương pháp Phaco cho người cao tuổi có hoàn cảnh khó khăn.',
      targetAmount: 500 * M,
      sortOrder: 1,
      amounts: [100, 80, 50, 40, 30, 20, 10, 10, 5, 5], // tổng 350 triệu
    },
    {
      slug: 'trai-tim-khoe-manh',
      name: 'Trái tim khỏe mạnh cho em - Tầm soát tim bẩm sinh học đường',
      description: 'Tầm soát và hỗ trợ điều trị tim bẩm sinh cho học sinh.',
      targetAmount: 300 * M,
      sortOrder: 2,
      amounts: [80, 50, 30, 20, 10, 10, 5, 5], // tổng 210 triệu
    },
    {
      slug: 'tu-thuoc-ban-lang',
      name: 'Tủ thuốc Y tế Bản làng & Khám bệnh vùng cao biên giới',
      description: 'Trang bị tủ thuốc và tổ chức khám bệnh miễn phí cho bản làng vùng cao biên giới.',
      targetAmount: 200 * M,
      sortOrder: 3,
      amounts: [] as number[],
    },
  ];

  for (const [ci, c] of campaigns.entries()) {
    const campaign = await prisma.campaign.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description, targetAmount: BigInt(c.targetAmount), sortOrder: c.sortOrder },
      create: {
        slug: c.slug,
        name: c.name,
        description: c.description,
        targetAmount: BigInt(c.targetAmount),
        sortOrder: c.sortOrder,
      },
    });

    for (const [i, amount] of c.amounts.entries()) {
      const code = `VACHE-TN-9${ci + 1}${String(i + 1).padStart(4, '0')}`;
      const completedAt = new Date(Date.now() - (i + 1) * 36 * 3600 * 1000);
      await prisma.paymentTransaction.upsert({
        where: { code },
        update: {},
        create: {
          code,
          purpose: 'CHARITY_DONATION',
          payerType: i % 2 === 0 ? 'ORGANIZATION' : 'INDIVIDUAL',
          payerName: DONORS[i % DONORS.length],
          amount: BigInt(amount * M),
          status: 'COMPLETED',
          method: 'VIETQR',
          bankGateway: 'MB Bank',
          verified: true,
          note: 'SEED_DEMO',
          expiresAt: completedAt,
          completedAt,
          campaignId: campaign.id,
        },
      });
    }
  }

  // Báo cáo giải ngân mẫu cho chiến dịch 1
  const first = await prisma.campaign.findUniqueOrThrow({ where: { slug: 'anh-sang-cong-dong' } });
  if ((await prisma.disbursement.count({ where: { campaignId: first.id } })) === 0) {
    await prisma.disbursement.createMany({
      data: [
        {
          campaignId: first.id,
          disbursedAt: new Date(`${year}-03-15T00:00:00+07:00`),
          item: 'Phẫu thuật Phaco đợt 1 (dữ liệu mẫu)',
          amount: BigInt(120 * M),
          beneficiary: 'Bệnh viện Mắt (mẫu)',
          description: 'Dữ liệu mẫu - thay bằng số liệu thực tế.',
          photoUrls: [],
        },
        {
          campaignId: first.id,
          disbursedAt: new Date(`${year}-06-20T00:00:00+07:00`),
          item: 'Phẫu thuật Phaco đợt 2 (dữ liệu mẫu)',
          amount: BigInt(100 * M),
          beneficiary: 'Bệnh viện Mắt (mẫu)',
          description: 'Dữ liệu mẫu - thay bằng số liệu thực tế.',
          photoUrls: [],
        },
      ],
    });
  }
}

async function seedFeeSchedules() {
  const rows = [
    {
      code: 'HP-TAPTHE',
      name: 'Hội phí hội viên tập thể / đơn vị pháp nhân',
      category: 'ANNUAL_MEMBERSHIP_FEE' as const,
      targetGroup: 'ORGANIZATION' as const,
      minAmount: 2 * M,
      maxAmount: 5 * M,
      note: 'Doanh nghiệp, bệnh viện, viện nghiên cứu, phòng khám thành viên. Mức thu tùy quy mô.',
      sortOrder: 1,
    },
    {
      code: 'HP-CANHAN',
      name: 'Hội phí hội viên cá nhân',
      category: 'ANNUAL_MEMBERSHIP_FEE' as const,
      targetGroup: 'INDIVIDUAL' as const,
      minAmount: 200_000,
      maxAmount: 500_000,
      note: 'Bác sĩ, dược sĩ, y sĩ, lương y, cán bộ y tế cộng đồng. Có chính sách miễn giảm cho sinh viên y khoa, hội viên cao tuổi, hoàn cảnh khó khăn.',
      sortOrder: 2,
    },
    {
      code: 'TL-VIEN-TT',
      name: 'Phí thẩm định, cấp quyết định thành lập Viện, Trung tâm',
      category: 'ESTABLISHMENT_FEE' as const,
      note: 'Chưa nhập mức phí - cập nhật theo quyết định của Trung ương Hội.',
      sortOrder: 3,
    },
    {
      code: 'TL-CHIHOI',
      name: 'Phí thành lập Liên Chi hội, Chi hội, Ban chuyên môn',
      category: 'ESTABLISHMENT_FEE' as const,
      note: 'Chưa nhập mức phí - cập nhật theo quyết định của Trung ương Hội.',
      sortOrder: 4,
    },
    {
      code: 'TL-DONVI-VPDD',
      name: 'Phí thẩm định hồ sơ đơn vị thành viên, văn phòng đại diện',
      category: 'ESTABLISHMENT_FEE' as const,
      note: 'Chưa nhập mức phí - cập nhật theo quyết định của Trung ương Hội.',
      sortOrder: 5,
    },
  ];

  for (const r of rows) {
    const data = {
      name: r.name,
      category: r.category,
      targetGroup: r.targetGroup,
      minAmount: r.minAmount === undefined ? null : BigInt(r.minAmount),
      maxAmount: r.maxAmount === undefined ? null : BigInt(r.maxAmount),
      note: r.note,
      sortOrder: r.sortOrder,
    };
    await prisma.feeSchedule.upsert({ where: { code: r.code }, update: data, create: { code: r.code, ...data } });
  }
}

async function seedDocuments() {
  if ((await prisma.financeDocument.count()) > 0) return;
  await prisma.financeDocument.createMany({
    data: [
      { title: 'Quy chế Quản lý Tài chính của Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam', docType: 'QUY_CHE' },
      {
        title: 'Nghị quyết Ban Chấp hành Trung ương Hội về việc ban hành định mức thu nộp hội phí nhiệm kỳ 2021 - 2026',
        docType: 'NGHI_QUYET',
      },
      { title: 'Hướng dẫn thực hiện nghĩa vụ hội phí dành cho các Chi hội địa phương', docType: 'HUONG_DAN' },
    ],
  });
}

async function seedUnits() {
  const units = [
    { code: 'CH-DANANG', name: 'Chi hội Đà Nẵng', unitType: 'BRANCH' as const, province: 'Đà Nẵng', annualFee: 3 * M },
    { code: 'VIEN-YSH01', name: 'Viện Y Sinh Học 01', unitType: 'INSTITUTE' as const, province: 'Hà Nội', annualFee: 5 * M },
    { code: 'DN-AOVUA', name: 'Doanh nghiệp Áo Vua', unitType: 'ENTERPRISE' as const, province: 'TP. Hồ Chí Minh', annualFee: 2 * M },
  ];

  for (const u of units) {
    const unit = await prisma.feeUnit.upsert({
      where: { code: u.code },
      update: { name: u.name, annualFee: BigInt(u.annualFee) },
      create: { ...u, annualFee: BigInt(u.annualFee) },
    });

    // Đã nộp đủ 2 năm trước; năm hiện tại: VIEN-YSH01 đã nộp, 2 đơn vị còn lại còn nợ
    const paidCurrent = u.code === 'VIEN-YSH01';
    for (const y of [year - 2, year - 1, year]) {
      const paid = y < year || paidCurrent;
      await prisma.feeObligation.upsert({
        where: { unitId_year: { unitId: unit.id, year: y } },
        update: {},
        create: {
          unitId: unit.id,
          year: y,
          amountDue: BigInt(u.annualFee),
          amountPaid: paid ? BigInt(u.annualFee) : 0n,
          status: paid ? 'PAID' : 'UNPAID',
          dueDate: dueDate(y),
          paidAt: paid ? new Date(`${y}-06-30T00:00:00+07:00`) : null,
        },
      });
    }
  }
}

async function main() {
  await seedCampaigns();
  await seedFeeSchedules();
  await seedDocuments();
  await seedUnits();
  console.log('Seed xong: 3 chiến dịch, biểu mức phí, 3 đơn vị mẫu.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
