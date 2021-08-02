import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Task } from '../../shared/task';
import { TaskService } from '../../shared/task.service';


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Get()
    async getAll(@Res() res: Response) : Promise<Task[]> {
        const tasks = this.taskService.getAll();
        
        if(!tasks) {
            res.status(HttpStatus.NOT_FOUND).send();
        }

        return tasks
    }

    
    @Get(':id')
    async getById(@Res() res: Response, @Param('id') id: number) : Promise<Task> {
        const task = this.taskService.getById(id);

        if(!task){
            res.status(HttpStatus.NOT_FOUND).send();
        }

        return task;
    }

    
    @Post()
    async create(@Res() res: Response, @Body() task: Task) : Promise<number> {
        const id = this.taskService.create(task);

        if(!id){
            res.status(HttpStatus.BAD_REQUEST).send();
        }

        return id
    }
    
    @Put(':id')
    async update(@Param('id') id: number , @Body() task: Task): Promise<Task> {
        return this.taskService.update(id, task);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.taskService.delete(id);
    }
    
}
