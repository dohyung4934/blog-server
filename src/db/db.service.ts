import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Connection, createConnection } from 'mysql'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DbService implements OnModuleDestroy {
    private configService: ConfigService
    private connection: Connection

    constructor(configService: ConfigService) {
        this.configService = configService
        this.initConnection()
    }

    private initConnection() {
        const connection = createConnection({
            host: this.configService.get<string>('DATABASE_HOST'),
            user: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: 'kdh-board-db'
        })
        connection.connect()
        this.connection = connection
    }

    public query<T>(sql: string, args: unknown[] = []): Promise<T> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    public onModuleDestroy() {
        this.connection.end()
    }
}
