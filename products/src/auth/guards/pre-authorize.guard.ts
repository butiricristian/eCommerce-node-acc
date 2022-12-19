import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRE_AUTHORIZE_KEY } from '../decorators/pre-authorize.decorator';

@Injectable()
export class PreAuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const preAuthorize = this.reflector.getAll(PRE_AUTHORIZE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!preAuthorize) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return true;
  }
}
