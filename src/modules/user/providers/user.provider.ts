import { DataSource } from "typeorm";
import { UsersEntity } from "../entities/user.entity";

export const usersProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UsersEntity),
        inject: ['DATA_SOURCE']
    }
]