import { randomUUID } from 'crypto';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { Login } from 'src/entities/logins/logins.model';

import { AUTH_OPTIONS, AuthOptions } from './auth.options';

/** WARN: Don't expose this service to the user directly. */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(AUTH_OPTIONS) private options: AuthOptions,
    private dataSource: DataSource,
  ) {}

  /** Generates access and refresh tokens for a user
   * based on the user's id.
   * Later, we can use the other user's properties to
   * generate the tokens.
   * */
  private async generateTokens(userId: number) {
    const payload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.options.accessTokenSecret,
      expiresIn: this.options.accessTokenExpiresIn,
      jwtid: randomUUID(),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.options.refreshTokenSecret,
      expiresIn: this.options.refreshTokenExpiresIn,
      jwtid: randomUUID(), // avoid conflicts of `sign` for tokens with the same payload (expiresIn is based on seconds)
    });

    console.log({ accessToken, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  /** Logs in a user by generating tokens and saving the
   *  hashed refresh token to the database.
   */
  async login(userId: number) {
    const tokens = await this.generateTokens(userId);

    const hashedRefreshToken = await hash(
      tokens.refreshToken.split('.')[2],
      10,
    );

    const insertResult = await this.dataSource
      .getRepository<Login>(Login)
      .insert({ userId, hashedRefreshToken });
    const isLoginCreated = insertResult.identifiers.length === 1;

    if (!isLoginCreated) {
      throw new HttpException('login_failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      tokens,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.options.refreshTokenSecret,
      });
    } catch (error) {
      throw new HttpException(
        'refresh_token_is_invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { sub: userId } = this.jwtService.decode(refreshToken);

    const logins = await this.dataSource
      .getRepository<Login>(Login)
      .find({ where: { userId } });

    let loginId: number | null = null;
    for (const login of logins) {
      if (await compare(refreshToken.split('.')[2], login.hashedRefreshToken)) {
        loginId = login.id;
        console.log(
          'found loginId: ',
          loginId,
          'comapred',
          refreshToken.split('.')[2],
          login.hashedRefreshToken,
        );
        //break;
      }
    }
    if (loginId === null) {
      throw new HttpException(
        'refresh_token_is_invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    console.log('refresh: ', { logins, loginId, refreshToken });

    const newTokens = await this.generateTokens(userId);
    const newHashedRefreshToken = await hash(
      newTokens.refreshToken.split('.')[2],
      10,
    );

    console.log({ newHashedRefreshToken });

    const updateResult = await this.dataSource
      .getRepository<Login>(Login)
      .update(
        { id: loginId, userId },
        { hashedRefreshToken: newHashedRefreshToken },
      );
    const isValid = updateResult.affected === 1;

    if (!isValid) {
      throw new HttpException(
        'refresh_token_is_invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return newTokens;
  }

  async getAllLogins(userId: number): Promise<Login[]> {
    const logins = await this.dataSource.getRepository<Login>(Login).find({
      where: { userId },
      select: ['id', 'updatedAt'],
    });
    return logins;
  }

  async logout(refreshToken: string): Promise<true> {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.options.refreshTokenSecret,
      });
    } catch (error) {
      throw new HttpException(
        'refresh_token_is_invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { sub: userId } = this.jwtService.decode(refreshToken);

    const logins = await this.dataSource.getRepository<Login>(Login).find({
      where: { userId },
    });

    let loginId: number | null = null;
    for (const login of logins) {
      if (await compare(refreshToken.split('.')[2], login.hashedRefreshToken)) {
        loginId = login.id;
        break;
      }
    }
    if (loginId === null) {
      throw new HttpException(
        'refresh_token_is_invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    console.log('logout: ', { logins, loginId, refreshToken });

    await this.dataSource.getRepository<Login>(Login).delete(loginId);

    return true;
  }
}
