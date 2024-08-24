import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ManagerRoleGuard } from 'src/guards/manager.role.guard';
import { EmployeeRoleGuard } from 'src/guards/employee.role.guard';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(ManagerRoleGuard)
  async store(
    @Body() data: CreateUserDto,
    @Res() response: Response
  ) {

    const userExists = await this.usersService.existsWithEmail(data.email);
    if (userExists) {
      return response.status(422).send({ error: 'User alredy exists' });
    }

    return response.status(201).send(await this.usersService.create(data));
  }

  @Put(':id')
  @UseGuards(ManagerRoleGuard)
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
    @Res() response: Response
  ) {

    const user = await this.usersService.findById(id);
    if (!user) {
      return response.status(404).send({ error: 'User not found' });
    }

    return response.status(200).send(await this.usersService.update(user, data));
  }

  @Get(':id')
  @UseGuards(EmployeeRoleGuard)
  async find(
    @Param('id') id: number,
    @Res() response: Response
  ) {

    const user = await this.usersService.findById(id);
    if (!user) {
      return response.status(404).send({ error: 'User not found' });
    }

    return response.status(200).send(user);
  }

  @Get()
  @UseGuards(EmployeeRoleGuard)
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 10,
    @Res() response: Response,
  ) {

    const result = await this.usersService.findAll(page, perPage);
    return response.status(200).send(result);
  }
}