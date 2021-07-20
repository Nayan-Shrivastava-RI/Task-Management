import { TaskStatus } from "../task-status.enum";
import { IsNotEmpty, IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto{
    
    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    search: string;
}