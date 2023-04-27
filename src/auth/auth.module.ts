import { Module } from '@nestjs/common'
import { DbModule } from '@/db/db.module'
import { TokenModule } from '@/token/token.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [DbModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TokenModule]
})
export class AuthModule { }
