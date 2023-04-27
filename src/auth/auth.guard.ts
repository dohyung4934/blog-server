import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { TokenService } from '@/token/token.service'

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly tokenService: TokenService) { }

  public canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = this.getTokenFromRequest(request)
    try {
      const username = this.tokenService.getTokenUsername(token)
      request.username = username
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  public getTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
