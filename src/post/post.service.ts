import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { OkPacket } from 'mysql'
import { DbService } from '@/db/db.service'
import { PostEntity } from './entity/post.entity'
import { CreateNewPostDto } from './dto/create-new-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostService {
    constructor(private dbService: DbService) { }

    async getPostList() {
        const response = await this.dbService.query<PostEntity[]>('SELECT * FROM posts')

        return {
            postList: response.map(row => ({
                id: row.id,
                title: row.title,
                contents: row.contents
            }))
        }
    }

    async getPostById(id: string) {
        const response = await this.dbService.query<PostEntity[]>('SELECT * FROM posts WHERE id = ?', [id])
        if (response.length !== 1) {
            throw new NotFoundException('해당 ID로 게시글을 찾지 못했습니다.')
        }
        const post = response[0]

        return {
            postDetail: {
                id: post.id,
                title: post.title,
                contents: post.contents
            }
        }
    }

    async createNewPost(newPost: CreateNewPostDto) {
        try {
            const response = await this.dbService.query<OkPacket>('INSERT INTO posts(title, contents) VALUES (?, ?)', [newPost.title, newPost.body])

            return {
                id: response.insertId
            }
        } catch {
            throw new InternalServerErrorException('게시글 등록에 실패하였습니다.')
        }
    }

    async updatePost(id: string, post: UpdatePostDto) {
        try {
            await this.dbService.query('UPDATE posts SET title = ?, contents = ? WHERE id = ?', [post.title, post.contents, id])
            return await this.getPostById(id)
        } catch (e) {
            throw new InternalServerErrorException('게시글 수정에 실패하였습니다.')
        }
    }

    async deletePost(id: string) {
        try {
            await this.dbService.query('DELETE FROM posts WHERE id = ?', [id])

            return {
                msg: '성공'
            }
        } catch (e) {
            throw new InternalServerErrorException('게시글 삭제에 실패하였습니다.')
        }
    }
}
