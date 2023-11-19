export const USERS_OPTIONS = 'USERS_OPTIONS';
export const USERS_SECURITY_OPTIONS = 'USERS_SECURITY_OPTIONS';

export interface UsersOptions {
  security: UsersSecurityOptions;
}

export interface UsersSecurityOptions {
  JWT_SECRET: string;
}
