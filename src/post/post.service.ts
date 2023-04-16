import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createConnection } from 'mysql'

@Injectable()
export class PostService {
    constructor(private configService: ConfigService) {}
    
    getPostList() {
        const connection = createConnection({
            host: '3.37.36.210',
            user: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: 'kdh-board-db'
        })
        connection.connect()
        connection.query('SELECT * FROM posts', (error, rows) => {
            if (error) throw error
            console.log(rows)
        })
        connection.end()
        return {
            postList: [
                {
                    id: '1',
                    title: '글1aa',
                },
                {
                    id: '2',
                    title: '안녕하세요',
                },
                {
                    id: '3',
                    title: '글3',
                }
            ]
        }
    }
}
