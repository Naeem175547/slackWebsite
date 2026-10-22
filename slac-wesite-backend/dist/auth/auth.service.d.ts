import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    generateJwtToken(user: any): Promise<string>;
    verifyJWT(token: string): any;
    verifyToken(token: string): Promise<void>;
}
