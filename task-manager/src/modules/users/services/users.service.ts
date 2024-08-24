import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EntityManager, Repository, MoreThanOrEqual } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Role } from '../enums/role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly entityManager: EntityManager,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.role = createUserDto.role;
        user.password = await argon2.hash(createUserDto.password);

        await this.entityManager.save(user);
        return user;
    }

    async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {

        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        user.role = updateUserDto.role;

        await this.entityManager.save(user);
        return user;
    }

    async findAll(page: number = 1, perPage: number = 10) {
        const [users, total] = await this.usersRepository.findAndCount({
            select: ['id', 'name', 'email', 'role'],
            skip: (page - 1) * perPage,
            take: perPage,
        });

        return {
            data: users,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    async existsWithEmail(email: string): Promise<boolean> {
        return await this.usersRepository.exists({
            where: {
                email: email,
            },
        });
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            select: ['id', 'name', 'email', 'role'],
            where: { id }
        });
        return user;
    }

    async findAllResponsibles(page: number = 1, perPage: number = 10) {
        const [users, total] = await this.usersRepository.findAndCount({
            select: ['id', 'name', 'role'],
            where: {
                role: MoreThanOrEqual(Role.EMPLOYEE)
            },
            skip: (page - 1) * perPage,
            take: perPage,
        });

        return {
            data: users,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }
}