import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@/auth/auth.guard'
import { PostService } from './post.service'
import { CreateNewPostDto } from './dto/create-new-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get('')
  async getList() {
    return await this.postService.getPostList()
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return await this.postService.getPostById(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  async createNewPost(@Body() createNewPostDto: CreateNewPostDto, @Request() request) {
    createNewPostDto.username = request.username
    return await this.postService.createNewPost(createNewPostDto)
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.updatePost(id, updatePostDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id)
  }
}
