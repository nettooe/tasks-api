import { Module } from '@nestjs/common';
import { TaskController } from 'src/task/controllers/task/task.controller';
import { TaskService } from './shared/task.service';


@Module({
    controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
