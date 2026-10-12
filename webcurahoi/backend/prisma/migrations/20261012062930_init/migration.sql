-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('CHARITY_DONATION', 'ANNUAL_MEMBERSHIP_FEE', 'ESTABLISHMENT_FEE');

-- CreateEnum
CREATE TYPE "PayerType" AS ENUM ('INDIVIDUAL', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('VIETQR', 'BANK_TRANSFER', 'CASH');

-- CreateEnum
CREATE TYPE "ObligationStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID', 'WAIVED');

-- CreateEnum
CREATE TYPE "FeeTargetGroup" AS ENUM ('ORGANIZATION', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "FeeUnitType" AS ENUM ('BRANCH', 'UNION_BRANCH', 'INSTITUTE', 'CENTER', 'SPECIALIZED_BOARD', 'REP_OFFICE', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "WebhookResult" AS ENUM ('MATCHED', 'NO_MATCH', 'AMOUNT_MISMATCH', 'DUPLICATE', 'IGNORED');

-- CreateTable
CREATE TABLE "fin_campaigns" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "targetAmount" BIGINT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "coverImageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fin_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_disbursements" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "disbursedAt" TIMESTAMP(3) NOT NULL,
    "item" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "description" TEXT,
    "photoUrls" TEXT[],
    "minutesFileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fin_disbursements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_fee_schedules" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PaymentPurpose" NOT NULL,
    "targetGroup" "FeeTargetGroup",
    "minAmount" BIGINT,
    "maxAmount" BIGINT,
    "note" TEXT,
    "effectiveFrom" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fin_fee_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_documents" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "title" TEXT NOT NULL,
    "docType" TEXT,
    "issuedDate" TIMESTAMP(3),
    "fileUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fin_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_fee_units" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitType" "FeeUnitType" NOT NULL,
    "province" TEXT,
    "contactEmail" TEXT,
    "annualFee" BIGINT,
    "externalOrgId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fin_fee_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_fee_obligations" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "amountDue" BIGINT NOT NULL,
    "amountPaid" BIGINT NOT NULL DEFAULT 0,
    "status" "ObligationStatus" NOT NULL DEFAULT 'UNPAID',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fin_fee_obligations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_certificates" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "verifyCode" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "obligationId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedBy" TEXT,

    CONSTRAINT "fin_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_transactions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,
    "payerType" "PayerType" NOT NULL DEFAULT 'INDIVIDUAL',
    "payerName" TEXT NOT NULL,
    "payerEmail" TEXT,
    "payerPhone" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "amount" BIGINT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "method" "PaymentMethod" NOT NULL DEFAULT 'VIETQR',
    "note" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "bankRef" TEXT,
    "bankGateway" TEXT,
    "accountMasked" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "receiptEmailSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT,
    "unitId" TEXT,
    "obligationId" TEXT,

    CONSTRAINT "fin_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fin_webhook_logs" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT,
    "payload" JSONB NOT NULL,
    "result" "WebhookResult" NOT NULL,
    "transactionCode" TEXT,
    "note" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fin_webhook_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fin_campaigns_slug_key" ON "fin_campaigns"("slug");

-- CreateIndex
CREATE INDEX "fin_disbursements_campaignId_disbursedAt_idx" ON "fin_disbursements"("campaignId", "disbursedAt");

-- CreateIndex
CREATE UNIQUE INDEX "fin_fee_schedules_code_key" ON "fin_fee_schedules"("code");

-- CreateIndex
CREATE UNIQUE INDEX "fin_fee_units_code_key" ON "fin_fee_units"("code");

-- CreateIndex
CREATE UNIQUE INDEX "fin_fee_units_externalOrgId_key" ON "fin_fee_units"("externalOrgId");

-- CreateIndex
CREATE UNIQUE INDEX "fin_fee_obligations_unitId_year_key" ON "fin_fee_obligations"("unitId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "fin_certificates_code_key" ON "fin_certificates"("code");

-- CreateIndex
CREATE UNIQUE INDEX "fin_certificates_verifyCode_key" ON "fin_certificates"("verifyCode");

-- CreateIndex
CREATE UNIQUE INDEX "fin_certificates_obligationId_key" ON "fin_certificates"("obligationId");

-- CreateIndex
CREATE UNIQUE INDEX "fin_certificates_unitId_year_key" ON "fin_certificates"("unitId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "fin_transactions_code_key" ON "fin_transactions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "fin_transactions_bankRef_key" ON "fin_transactions"("bankRef");

-- CreateIndex
CREATE INDEX "fin_transactions_status_completedAt_idx" ON "fin_transactions"("status", "completedAt");

-- CreateIndex
CREATE INDEX "fin_transactions_campaignId_status_idx" ON "fin_transactions"("campaignId", "status");

-- CreateIndex
CREATE INDEX "fin_transactions_unitId_status_idx" ON "fin_transactions"("unitId", "status");

-- CreateIndex
CREATE INDEX "fin_transactions_purpose_status_idx" ON "fin_transactions"("purpose", "status");

-- CreateIndex
CREATE INDEX "fin_webhook_logs_receivedAt_idx" ON "fin_webhook_logs"("receivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "fin_webhook_logs_provider_externalId_key" ON "fin_webhook_logs"("provider", "externalId");

-- AddForeignKey
ALTER TABLE "fin_disbursements" ADD CONSTRAINT "fin_disbursements_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "fin_campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fin_fee_obligations" ADD CONSTRAINT "fin_fee_obligations_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "fin_fee_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fin_certificates" ADD CONSTRAINT "fin_certificates_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "fin_fee_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fin_certificates" ADD CONSTRAINT "fin_certificates_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "fin_fee_obligations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fin_transactions" ADD CONSTRAINT "fin_transactions_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "fin_campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fin_transactions" ADD CONSTRAINT "fin_transactions_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "fin_fee_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fin_transactions" ADD CONSTRAINT "fin_transactions_obligationId_fkey" FOREIGN KEY ("obligationId") REFERENCES "fin_fee_obligations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
