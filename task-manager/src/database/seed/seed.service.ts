import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/users/enums/role.enum';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async seed() {
        const email = 'admin@gmail.com';
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            const user = new User();
            user.name = 'admin';
            user.email = email;
            user.role = Role.ADMIN;
            user.password = await argon2.hash('adminPassword');
            await this.userRepository.save(user);
        }
        console.log('Seeding complete');
    }
}
