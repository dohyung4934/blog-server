import { Module } from '@nestjs/common'
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  imports: [DbModule, AuthModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
