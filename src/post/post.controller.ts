import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { PostService } from './post.service'
import { CreateNewPostDto } from './dto/create-new-post.dto'

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('')
    getList() {
        return this.postService.getPostList()
    }

    @Get(':id')
    getDetail(@Param('id') id: string): string {
        return 'detail' + id
    }

    @Post()
    createNewPost(@Body() createNewPostDto: CreateNewPostDto) {
        return {
            id: 333
        }
    }

    @Put(':id')
    updatePost(@Param('id') id: string): string {
        return 'update' + id
    }

    @Delete(':id')
    deletePost(@Param('id') id: string): string {
        return 'delete' + id
    }
}