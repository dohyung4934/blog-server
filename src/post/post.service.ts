import { Injectable } from '@nestjs/common'

@Injectable()
export class PostService {
    getTest(): string {
        return '테스트입니다.'
    }
}
