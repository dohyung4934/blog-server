import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
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
  async createNewPost(@Body() createNewPostDto: CreateNewPostDto) {
    return await this.postService.createNewPost(createNewPostDto)
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.updatePost(id, updatePostDto)
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id)
  }
}
