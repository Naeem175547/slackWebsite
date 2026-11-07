import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { GraphQLError } from 'graphql';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,private readonly userService:UserService) {}
    
    async generateJwtToken(user: any){        
        return this.jwtService.sign({ id: user.id, email: user.email, username: user.username });    
        
    }
    verifyJWT(token: string) {
    return this.jwtService.verify(token);
   }

   async verifyToken(token:string){
    try{

      const user=await this.userService.findUserByToken(token)
    if(!user){
      throw new GraphQLError('user not found')      
    }

    if (!token || token !== user.token) {
    throw new GraphQLError('Invalid token');
     }

     if(!user.tokenExpiryDate){
      throw new GraphQLError('expiry date missing');
     }

    if(new Date(user.tokenExpiryDate).getTime() <Date.now()){
       throw new GraphQLError('user not found')       
    }

    user.token=null;
    user.isVarified=true;
    user.tokenExpiryDate=null;
    await this.userService.update(user.id,user);

    }catch(error){
      throw error

    }
    
  }

}

