import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DbService } from '@/db/db.service'
import { TokenService } from '@/token/token.service'
import { CreateTokenDto } from './dto/create-token.dto'

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbService, private readonly tokenService: TokenService) { }

  public async createToken(createTokenDto: CreateTokenDto) {
    type CountResult = { count: number }
    const response = await this.dbService.query<CountResult[]>('SELECT COUNT(*) AS count FROM users WHERE username = ? AND password = ?', [createTokenDto.username, createTokenDto.password])

    if (response[0].count > 0) {
      const token = this.tokenService.createToken(createTokenDto.username)
      return { token }
    } else {
      throw new UnauthorizedException()
    }
  }
}
