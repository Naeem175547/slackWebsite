import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    async generateJwtToken(user: any){        
        return this.jwtService.sign({ id: user.id, email: user.email, username: user.username });    
        
    }
    verifyJWT(token: string) {
    return this.jwtService.verify(token);
  }

}

