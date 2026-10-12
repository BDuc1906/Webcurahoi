import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import type { StatementRow } from '../lib/mappers';

export interface FinanceEventMap {
  'payment:completed': StatementRow;
  'payment:expired': { code: string };
}

/**
 * Bus sự kiện trong bộ nhớ, phục vụ SSE (đẩy thời gian thực).
 * Lưu ý: chỉ hoạt động đúng khi chạy 1 instance. Nếu scale nhiều instance
 * cần thay bằng Redis pub/sub hoặc Postgres LISTEN/NOTIFY.
 */
@Injectable()
export class FinanceEventsService {
  private readonly emitter = new EventEmitter();

  constructor() {
    this.emitter.setMaxListeners(0);
  }

  emit<K extends keyof FinanceEventMap>(event: K, payload: FinanceEventMap[K]): void {
    this.emitter.emit(event, payload);
  }

  on<K extends keyof FinanceEventMap>(event: K, handler: (payload: FinanceEventMap[K]) => void): () => void {
    this.emitter.on(event, handler);
    return () => this.emitter.off(event, handler);
  }
}
