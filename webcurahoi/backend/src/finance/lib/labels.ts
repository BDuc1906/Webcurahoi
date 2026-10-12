import { PaymentPurpose } from '@prisma/client';

export const PURPOSE_LABEL: Record<PaymentPurpose, string> = {
  CHARITY_DONATION: 'Đóng góp thiện nguyện',
  ANNUAL_MEMBERSHIP_FEE: 'Hội phí niên liễm',
  ESTABLISHMENT_FEE: 'Phí thành lập / công nhận đơn vị',
};
