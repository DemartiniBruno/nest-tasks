import { UsersEntity } from "src/modules/user/entities/user.entity"
import { TasksEntity } from "../../modules/tasks/entities/tasks.entity"
import { DataSource } from "typeorm"

export const databaseProvider = [

    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type:'postgres',
                host: process.env.DB_HOST,
                port:Number(process.env.DB_PORT),
                username:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD,
                database:process.env.DB_DATABASE,
                entities:[
                    // __dirname + '/../**/*.entity{.ts,.js}',
                    TasksEntity,
                    UsersEntity
                ],
                synchronize:true
            })

            return dataSource.initialize()
        }
    }
]