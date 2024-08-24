import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { TasksService } from '../services/tasks.service';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';

@Controller('api/tasks/responsible')
@UseGuards(AuthGuard, EmployeeRoleGuard)
export class TasksWithResponsibleController {
  constructor(private readonly tasksService: TasksService) { }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Res() response: Response
  ) {

    const task = await this.tasksService.findByIdWithResponsible(id);
    if (!task) {
      return response.status(404).send({ error: 'Task not found' });
    }

    return response.status(200).send(task);
  }
}