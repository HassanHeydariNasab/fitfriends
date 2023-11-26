export interface AuthOptions {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export const AUTH_OPTIONS = 'AUTH_OPTIONS';
