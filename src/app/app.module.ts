import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostModule } from '@/post/post.module'
import { AuthModule } from '@/auth/auth.module'

@Module({
  imports: [ConfigModule.forRoot(), PostModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
