import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TaskService {

    tasks: Task[] = [
        {id: 1, description: "Tarefa 001"},
        {id: 2, description: "Tarefa 002", completed: true},
        {id: 3, description: "Tarefa 003", completed: true}
    ];

    
    getAll(): Task[] {
        return this.tasks;
    }
    
    getById(id: number): Task {
        const task = this.tasks.find( (value) => value.id == id );
        return task;
    }
    
    create(task: Task): number {
        let lastId = 1;
        this.tasks.forEach((item) => {
            if(item.id > lastId) lastId = item.id
        })

        task.id = lastId + 1;

        this.tasks.push(task);
        
        return task.id;
    }
    
    update(id:number, task: Task): Task{
        const taskBD = this.tasks.find( (value) => value.id == id );
        if(taskBD) {
            taskBD.description = task.description;
            taskBD.completed = task.completed;
            return task;
        }

        return null;
    }

    delete(id: number) {
        const index = this.tasks.findIndex( (value) => value.id == id );
        if(index) {
            this.tasks.splice(index, 1);
        }
    }

}
