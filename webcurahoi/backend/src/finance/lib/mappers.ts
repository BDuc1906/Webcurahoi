import { PaymentTransaction, Prisma } from '@prisma/client';
import { env } from '../../config/env';
import { transferContent } from './codes';
import { PURPOSE_LABEL } from './labels';
import { buildQrImageUrl } from './vietqr';

export const statementInclude = {
  campaign: { select: { slug: true, name: true } },
  unit: { select: { code: true, name: true } },
} satisfies Prisma.PaymentTransactionInclude;

export type TxWithRefs = Prisma.PaymentTransactionGetPayload<{ include: typeof statementInclude }>;

/** Một dòng trên Bảng sao kê công khai. */
export function toStatementRow(tx: TxWithRefs) {
  return {
    code: tx.code,
    displayName: tx.isAnonymous ? 'Nhà hảo tâm ẩn danh' : tx.payerName,
    payerType: tx.payerType,
    purpose: tx.purpose,
    purposeLabel: PURPOSE_LABEL[tx.purpose],
    campaign: tx.campaign,
    unit: tx.unit,
    amount: Number(tx.amount),
    method: tx.method,
    bankGateway: tx.bankGateway,
    verified: tx.verified,
    completedAt: tx.completedAt,
  };
}

export type StatementRow = ReturnType<typeof toStatementRow>;

/** Thông tin trả về khi tạo mã thanh toán / kiểm tra trạng thái. */
export function toPaymentDto(tx: PaymentTransaction) {
  const content = transferContent(tx.code);
  const amount = Number(tx.amount);
  const secondsLeft = Math.max(0, Math.floor((tx.expiresAt.getTime() - Date.now()) / 1000));
  const expired = tx.status === 'PENDING' && secondsLeft === 0;

  return {
    code: tx.code,
    purpose: tx.purpose,
    purposeLabel: PURPOSE_LABEL[tx.purpose],
    status: expired ? 'EXPIRED' : tx.status,
    amount,
    payerName: tx.payerName,
    expiresAt: tx.expiresAt,
    secondsLeft: tx.status === 'PENDING' ? secondsLeft : 0,
    completedAt: tx.completedAt,
    qrContent: content,
    qrImageUrl: buildQrImageUrl(amount, content),
    bank: {
      name: env.BANK_NAME,
      binCode: env.BANK_BIN_CODE,
      accountNo: env.BANK_ACCOUNT_NO,
      accountName: env.BANK_ACCOUNT_NAME,
    },
  };
}
