import { Controller, Get, MessageEvent, Query, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import {
  HonorRollQuery,
  honorRollQuerySchema,
  StatementQuery,
  statementQuerySchema,
} from './statement.schemas';
import { StatementService } from './statement.service';

@Controller('finance')
export class StatementController {
  constructor(private readonly statement: StatementService) {}

  @Get('statement')
  list(@Query(new ZodValidationPipe(statementQuerySchema)) query: StatementQuery) {
    return this.statement.list(query);
  }

  @Get('statement/summary')
  summary() {
    return this.statement.summary();
  }

  @Sse('statement/stream')
  stream(): Observable<MessageEvent> {
    return this.statement.stream();
  }

  @Get('honor-roll')
  honorRoll(@Query(new ZodValidationPipe(honorRollQuerySchema)) query: HonorRollQuery) {
    return this.statement.honorRoll(query);
  }
}
