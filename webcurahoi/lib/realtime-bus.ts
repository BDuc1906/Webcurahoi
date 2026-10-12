import { FinanceTransaction } from "./db/schema";

type Handler = (tx: FinanceTransaction) => void;

const listeners = new Set<Handler>();

/** Bus sự kiện nội bộ frontend — phát giao dịch mới cho PublicFinanceStatement */
export const realtimeBus = {
  emit(tx: FinanceTransaction) {
    listeners.forEach((fn) => {
      try {
        fn(tx);
      } catch {
        /* noop */
      }
    });
  },
  on(fn: Handler): () => void {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};