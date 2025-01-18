import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, createDecipheriv, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';
import ShortUniqueId from 'short-unique-id';
import { DbContext } from 'src/modules/database/context/db-context';
import {
  JWT_ACCESS_EXPIRE_DATE,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_EXPIRE_DATE,
  JWT_REFRESH_SECRET_KEY,
  TOKEN_DB_SALT_KEY,
  TOKEN_DB_SECRET_KEY,
} from 'src/modules/environment/environment';
import { CustomLoggerService } from 'src/modules/logger/services';
import { ErrorCodeEnum } from 'src/modules/shared/types/enums';
import { UserService } from 'src/modules/user/services';
import { IUser } from 'src/modules/user/types/interfaces';
import { TokenTypeEnum } from '../types/enums';
import { IToken } from '../types/interfaces';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbContext: DbContext,
    private readonly logger: CustomLoggerService,
    private readonly userService: UserService,
  ) {}

  async checkAccessToken(token: string): Promise<JwtPayload> {
    try {
      const decodedToken: any = jwt.verify(token, JWT_ACCESS_SECRET_KEY);
      if (!decodedToken) {
        throw new UnauthorizedException();
      }

      const userToken = await this.findToken(token, TokenTypeEnum.ACCESS_TOKEN);

      if (!userToken) {
        throw new UnauthorizedException();
      }

      const payload = await this.validateJwtPayloadAsync(decodedToken);
      return payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async checkRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const decodedToken: any = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
      if (!decodedToken) {
        throw new UnauthorizedException();
      }

      const userToken = await this.findToken(
        token,
        TokenTypeEnum.REFRESH_TOKEN,
      );

      if (!userToken) {
        throw new UnauthorizedException();
      }

      const payload = await this.validateJwtPayloadAsync(decodedToken);
      return payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async revokeTokensByOwnerId(ownerId: string): Promise<void> {
    try {
      await this.dbContext.tokens.deleteMany({ ownerId });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to revoke tokens',
      });
    }
  }

  async validateJwtPayloadAsync(payload: JwtPayload): Promise<JwtPayload> {
    const { id } = payload;

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }

  private async buildJwtPayload(user: IUser): Promise<JwtPayload> {
    const { id, firstName, lastName, email, role } = user;

    const jwtPayload: JwtPayload = {
      id,
      firstName,
      lastName,
      email,
      role,
    };

    return jwtPayload;
  }

  async generateTokensAsync(payload: JwtPayload): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: JWT_ACCESS_SECRET_KEY,
        expiresIn: JWT_ACCESS_EXPIRE_DATE,
      }),
      this.jwtService.signAsync(payload, {
        secret: JWT_REFRESH_SECRET_KEY,
        expiresIn: JWT_REFRESH_EXPIRE_DATE,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async createToken(
    token: string,
    session: string,
    ownerId: string,
    type: TokenTypeEnum,
  ): Promise<IToken> {
    try {
      const entity = new this.dbContext.tokens({
        token: await this.encryptToken(token),
        ownerId,
        session,
        type,
      });

      await entity.save();
      return entity;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to create token',
      });
    }
  }

  async getTokensBySession(session: string): Promise<IToken[]> {
    try {
      const tokens = await this.dbContext.tokens.find({ session });
      return tokens;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to get tokens by session',
      });
    }
  }

  async findToken(token: string, type: TokenTypeEnum): Promise<IToken> {
    try {
      const encryptedToken = await this.encryptToken(token);
      const tokenData = await this.dbContext.tokens.findOne({
        token: encryptedToken,
        type,
      });
      return tokenData;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to find token',
      });
    }
  }

  async refreshToken(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const validRefreshTokenData = await this.findToken(
      token,
      TokenTypeEnum.REFRESH_TOKEN,
    );

    if (!validRefreshTokenData) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserById(
      validRefreshTokenData.ownerId,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.revokeTokens(token);

    const payload = await this.buildJwtPayload(user);

    const { accessToken, refreshToken } = await this.generateTokensAsync(
      payload,
    );

    const session = await this.generateSessionCode();
    await this.createToken(
      accessToken,
      session,
      user.id,
      TokenTypeEnum.ACCESS_TOKEN,
    );

    await this.createToken(
      refreshToken,
      session,
      user.id,
      TokenTypeEnum.REFRESH_TOKEN,
    );

    return { accessToken, refreshToken };
  }

  async revokeTokens(token: string, all?: boolean): Promise<boolean> {
    const encryptedToken = await this.encryptToken(token);

    const tokenData = await this.dbContext.tokens.findOne({
      token: encryptedToken,
    });

    try {
      if (tokenData) {
        if (all) {
          await this.dbContext.tokens.deleteMany({
            ownerId: tokenData.ownerId,
          });
        } else {
          await this.dbContext.tokens.deleteMany({
            session: tokenData.session,
          });
        }
      }
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to revoke tokens',
      });
    }

    return true;
  }

  async generateUserTokens(user: IUser): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = await this.buildJwtPayload(user);
    const { accessToken, refreshToken } = await this.generateTokensAsync(
      payload,
    );

    const session = await this.generateSessionCode();
    await this.createToken(
      accessToken,
      session,
      user.id,
      TokenTypeEnum.ACCESS_TOKEN,
    );
    await this.createToken(
      refreshToken,
      session,
      user.id,
      TokenTypeEnum.REFRESH_TOKEN,
    );

    return { accessToken, refreshToken };
  }

  private async generateSessionCode(): Promise<string> {
    const uid = new ShortUniqueId({ length: 16 });
    return uid();
  }

  async encryptToken(token: string): Promise<string> {
    const algorithm = 'aes-256-cbc';
    const secret = TOKEN_DB_SECRET_KEY;
    const salt = Buffer.from(TOKEN_DB_SALT_KEY);

    const key = pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
    const iv = pbkdf2Sync(secret, salt, 100000, 16, 'sha512');
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(token);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
  }

  async decryptToken(encryptedToken: string): Promise<string> {
    const algorithm = 'aes-256-cbc';
    const secret = TOKEN_DB_SECRET_KEY;
    const salt = Buffer.from(TOKEN_DB_SALT_KEY);

    const key = pbkdf2Sync(secret, salt, 100000, 32, 'sha512');
    const iv = pbkdf2Sync(secret, salt, 100000, 16, 'sha512');
    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(Buffer.from(encryptedToken, 'base64'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
