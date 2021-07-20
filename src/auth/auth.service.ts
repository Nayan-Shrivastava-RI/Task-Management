import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentials : AuthCredentials): Promise<User>{
        return await this.usersRepository.createUser(authCredentials);
    }

    async signIn(authCredentials : AuthCredentials): Promise<{accessToken: string}>{
        const { username, password } = authCredentials;
        const user = await this.usersRepository.findOne({username});

        if(user && (await bcrypt.compare(password,user.password))){
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken };            
        }else{
            throw new UnauthorizedException("Invalid username/password");
        }

    }
}
