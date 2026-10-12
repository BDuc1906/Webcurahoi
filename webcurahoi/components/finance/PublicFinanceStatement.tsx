"use client";

import React, { useState, useMemo } from "react";
import { MOCK_FINANCE_TRANSACTIONS } from "@/lib/mock-finance-data";
import { FinanceTransaction } from "@/lib/db/schema";
import { useLiveTransactions } from "@/hooks/useLiveTransactions";

import StatementStatsCards from "./statement/StatementStatsCards";
import StatementSearchBar from "./statement/StatementSearchBar";
import StatementLiveBanner from "./statement/StatementLiveBanner";
import StatementTable, { TabFilter } from "./statement/StatementTable";
import StatementPagination from "./statement/StatementPagination";
import StatementReceiptModal from "./statement/StatementReceiptModal";

const PAGE_SIZE = 15;

export default function PublicFinanceStatement() {
  const liveRows = useLiveTransactions();

  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [bankFilter, setBankFilter] = useState("ALL");
  const [amountRange, setAmountRange] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<FinanceTransaction | null>(null);

  const charityCount = useMemo(
    () =>
      MOCK_FINANCE_TRANSACTIONS.filter(
        (t) => t.category === "CHARITY_DONATION"
      ).length,
    []
  );
  const feeCount = useMemo(
    () =>
      MOCK_FINANCE_TRANSACTIONS.filter(
        (t) => t.category === "ANNUAL_MEMBERSHIP_FEE"
      ).length,
    []
  );

  const filteredTransactions = useMemo(() => {
    const combined = [...liveRows, ...MOCK_FINANCE_TRANSACTIONS];
    return combined.filter((tx) => {
      if (activeTab !== "ALL" && tx.category !== activeTab) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tx.targetName.toLowerCase().includes(q);
        const matchCode = tx.code.toLowerCase().includes(q);
        const matchNote = tx.qrContent.toLowerCase().includes(q);
        const matchBank = tx.bankSender
          ? tx.bankSender.toLowerCase().includes(q)
          : false;
        const matchAccount = tx.accountMasked
          ? tx.accountMasked.toLowerCase().includes(q)
          : false;
        const matchProv = tx.province
          ? tx.province.toLowerCase().includes(q)
          : false;
        const matchCampaign = tx.campaignName
          ? tx.campaignName.toLowerCase().includes(q)
          : false;

        if (
          !matchName &&
          !matchCode &&
          !matchNote &&
          !matchBank &&
          !matchAccount &&
          !matchProv &&
          !matchCampaign
        ) {
          return false;
        }
      }

      if (bankFilter !== "ALL") {
        if (
          !tx.bankSender ||
          !tx.bankSender.toLowerCase().includes(bankFilter.toLowerCase())
        ) {
          return false;
        }
      }

      if (amountRange !== "ALL") {
        if (amountRange === "UNDER_500K" && tx.amount >= 500000) return false;
        if (
          amountRange === "500K_2M" &&
          (tx.amount < 500000 || tx.amount > 2000000)
        )
          return false;
        if (
          amountRange === "2M_10M" &&
          (tx.amount < 2000000 || tx.amount > 10000000)
        )
          return false;
        if (amountRange === "OVER_10M" && tx.amount <= 10000000) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, bankFilter, amountRange, liveRows]);

  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTransactions.slice(start, start + PAGE_SIZE);
  }, [filteredTransactions, currentPage]);

  const currentFilteredSum = useMemo(
    () => filteredTransactions.reduce((acc, t) => acc + t.amount, 0),
    [filteredTransactions]
  );

  function handleChangeFilter(fn: () => void) {
    fn();
    setCurrentPage(1);
  }

  function handleReset() {
    setSearchQuery("");
    setBankFilter("ALL");
    setAmountRange("ALL");
    setCurrentPage(1);
  }

  return (
    <div className="space-y-8 font-gov">
      <StatementStatsCards
        activeTab={activeTab}
        charityCount={charityCount}
        feeCount={feeCount}
        liveCount={liveRows.length}
        onSelectTab={(tab) => handleChangeFilter(() => setActiveTab(tab))}
      />

      <StatementSearchBar
        searchQuery={searchQuery}
        bankFilter={bankFilter}
        amountRange={amountRange}
        resultCount={filteredTransactions.length}
        onChangeSearch={(v) => handleChangeFilter(() => setSearchQuery(v))}
        onChangeBank={(v) => handleChangeFilter(() => setBankFilter(v))}
        onChangeAmount={(v) => handleChangeFilter(() => setAmountRange(v))}
        onReset={handleReset}
      />

      <div className="space-y-4">
        <StatementLiveBanner count={liveRows.length} />

        <StatementTable
          activeTab={activeTab}
          rows={paginatedRows}
          charityCount={charityCount}
          feeCount={feeCount}
          liveCount={liveRows.length}
          totalCount={MOCK_FINANCE_TRANSACTIONS.length}
          totalAmount={currentFilteredSum}
          onSelectTab={(tab) => handleChangeFilter(() => setActiveTab(tab))}
          onSelectRow={setSelectedTx}
        />

        <StatementPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          totalItems={filteredTransactions.length}
          visibleCount={paginatedRows.length}
          onChangePage={(p) => {
            if (p >= 1 && p <= totalPages) setCurrentPage(p);
          }}
        />
      </div>

      <StatementReceiptModal
        tx={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </div>
  );
}