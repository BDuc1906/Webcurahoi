"use client";

import React, { useState, useMemo } from "react";
import { FinanceTransaction } from "@/lib/db/schema";
import { useLiveTransactions } from "@/hooks/useLiveTransactions";
import { useStatement } from "@/hooks/useStatement";

import StatementStatsCards from "./statement/StatementStatsCards";
import StatementSearchBar from "./statement/StatementSearchBar";
import StatementLiveBanner from "./statement/StatementLiveBanner";
import StatementTable, { TabFilter } from "./statement/StatementTable";
import StatementPagination from "./statement/StatementPagination";
import StatementReceiptModal from "./statement/StatementReceiptModal";

const PAGE_SIZE = 15;

export default function PublicFinanceStatement() {
  // ---- Dòng mới realtime từ Payment Terminal ----
  const liveRows = useLiveTransactions();

  // ---- Lấy data 100% từ backend ----
  const { rows: apiRows } = useStatement(500);

  // Gộp: dòng realtime lên trước + data backend (dedup theo code)
  const baseRows = useMemo(() => {
    const seen = new Set<string>();
    const merged: FinanceTransaction[] = [];
    for (const tx of [...liveRows, ...apiRows]) {
      if (seen.has(tx.code)) continue;
      seen.add(tx.code);
      merged.push(tx);
    }
    return merged;
  }, [liveRows, apiRows]);

  // ---- State bộ lọc ----
  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [bankFilter, setBankFilter] = useState("ALL");
  const [amountRange, setAmountRange] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<FinanceTransaction | null>(null);

  // ---- Đếm + tính tổng theo category (100% từ data thật) ----
  // Lưu ý: baseRows đã bao gồm liveRows, nên không cộng thêm liveCount vào tổng
  const charityCount = useMemo(
    () => baseRows.filter((t) => t.category === "CHARITY_DONATION").length,
    [baseRows]
  );
  const feeCount = useMemo(
    () => baseRows.filter((t) => t.category === "ANNUAL_MEMBERSHIP_FEE").length,
    [baseRows]
  );

  const charityAmount = useMemo(
    () =>
      baseRows
        .filter((t) => t.category === "CHARITY_DONATION")
        .reduce((s, t) => s + t.amount, 0),
    [baseRows]
  );
  const feeAmount = useMemo(
    () =>
      baseRows
        .filter((t) => t.category === "ANNUAL_MEMBERSHIP_FEE")
        .reduce((s, t) => s + t.amount, 0),
    [baseRows]
  );

  // ---- Lọc dữ liệu ----
  const filteredTransactions = useMemo(() => {
    return baseRows.filter((tx) => {
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
  }, [activeTab, searchQuery, bankFilter, amountRange, baseRows]);

  // ---- Phân trang ----
  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTransactions.slice(start, start + PAGE_SIZE);
  }, [filteredTransactions, currentPage]);

  const currentFilteredSum = useMemo(
    () => filteredTransactions.reduce((acc, t) => acc + t.amount, 0),
    [filteredTransactions]
  );

  // ---- Handlers ----
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
      {/* liveCount = 0 vì baseRows đã gộp liveRows rồi, không đếm trùng */}
      <StatementStatsCards
        activeTab={activeTab}
        charityCount={charityCount}
        feeCount={feeCount}
        charityAmount={charityAmount}
        feeAmount={feeAmount}
        liveCount={0}
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
        {/* Banner đếm số GD realtime mới — vẫn dùng liveRows.length */}
        <StatementLiveBanner count={liveRows.length} />

        <StatementTable
          activeTab={activeTab}
          rows={paginatedRows}
          charityCount={charityCount}
          feeCount={feeCount}
          liveCount={0}
          totalCount={baseRows.length}
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