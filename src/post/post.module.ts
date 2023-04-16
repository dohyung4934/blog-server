import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
    imports: [ConfigModule],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {}
