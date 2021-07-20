import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ){}
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }


    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async getTaskById(id: string): Promise<Task>{
        const found = await this.tasksRepository.findOne(id);
        if(found){
            return found;
        }
        throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    

    async deleteTaskById(id: string): Promise<Task>{
        
        return await this.tasksRepository.deleteTaskById(id);
        
    }

    async updateTaskStatus(id: string, status: TaskStatus){
        const task = await this.getTaskById(id);
        
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    getTasks(filterDto: GetTasksFilterDto, user: User,): Promise<Task[]>{

        return this.tasksRepository.getTasks(filterDto,user);
    }
}
