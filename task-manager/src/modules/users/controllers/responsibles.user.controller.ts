import {
  Controller,
  Get,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';

@Controller('api/responsibles/user')
@UseGuards(AuthGuard)
export class ResponsiblesUserController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(EmployeeRoleGuard)
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Res() response: Response,
  ) {

    const result = await this.usersService.findAllResponsibles(page, perPage);
    return response.status(200).send(result);
  }
}