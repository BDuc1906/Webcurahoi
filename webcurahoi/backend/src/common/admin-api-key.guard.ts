import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { env } from '../config/env';
import { safeEqual } from './safe-equal';

/**
 * Bảo vệ tạm các API quản trị bằng header `x-api-key`.
 * Khi nhóm làm xong module đăng nhập/phân quyền thì thay guard này bằng guard JWT.
 */
@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const key = req.header('x-api-key') ?? '';
    if (!safeEqual(key, env.ADMIN_API_KEY)) {
      throw new UnauthorizedException('Sai hoặc thiếu x-api-key');
    }
    return true;
  }
}
