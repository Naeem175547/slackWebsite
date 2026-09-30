import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwtToken(user: any): Promise<string>;
    verifyJWT(token: string): any;
}
