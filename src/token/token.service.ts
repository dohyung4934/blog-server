import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { sign, verify } from 'jsonwebtoken'

@Injectable()
export class TokenService {
  private privateKey: string

  public constructor(private readonly configService: ConfigService) {
    this.privateKey = this.getPrivateKey()
  }

  public createToken(username: string) {
    const payload = { username }
    const token = sign(payload, this.privateKey)
    return token
  }

  public getTokenUsername(token: string) {
    const payload = verify(token, this.privateKey)
    if (typeof payload !== 'object' || typeof payload.username !== 'string') {
      throw new Error('토큰 에러')
    }
    return payload.username
  }

  private getPrivateKey() {
    return this.configService.getOrThrow('TOKEN_PRIVATE_KEY')
  }
}
