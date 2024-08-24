import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "../dtos/login.dto";
import * as argon2 from 'argon2';
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async login(data: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersRepository.findOne({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            return {
                access_token: '',
            };
        }

        if (!await argon2.verify(user.password, data.password)) {
            return {
                access_token: '',
            };
        }

        const payload = { sub: user.id, username: user.email, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}