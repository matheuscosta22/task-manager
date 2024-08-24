import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/modules/users/enums/role.enum';

@Injectable()
export class EmployeeRoleGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            if (request['user']['role'] < Role.EMPLOYEE) {
                throw new UnauthorizedException();
            }
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}