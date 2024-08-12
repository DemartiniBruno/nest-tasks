import { DataSource } from "typeorm";
import { TasksEntity } from "../entities/tasks.entity";

export const tasksProviders = [
    {
        provide: 'TASKS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TasksEntity),
        inject: ['DATA_SOURCE']
    }
]