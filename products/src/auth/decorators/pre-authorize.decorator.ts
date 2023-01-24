import { SetMetadata } from '@nestjs/common';

export const PRE_AUTHORIZE_KEY = 'pre_authorize';
export const Roles = () => SetMetadata(PRE_AUTHORIZE_KEY, true);
