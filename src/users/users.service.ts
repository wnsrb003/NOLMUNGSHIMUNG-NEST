import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from '../users/dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Project } from 'src/projects/projects.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    
    async signUp(AuthCredentialDto: AuthCredentialDto): Promise<User>{
        return await this.UserRepository.createUser(AuthCredentialDto);
    }

    async signIn(AuthLoginDto: AuthLoginDto, res: Response){
        const {user_email, password} = AuthLoginDto;
        const user = await this.UserRepository.findUserByEmail(user_email);

        if (user && (await bcrypt.compare(password, user.password))){
            const payload = { user_email };
            const accessToken = await this.jwtService.sign(payload, {
                secret: process.env.USER,
                expiresIn: 60 * 60,
            });
            const refreshToken = await this.jwtService.sign(payload, {
                secret: process.env.USER,
                expiresIn: 60 * 60 * 24,
            });

            // this.UserRepository.update(user_email, { refresh_token: refreshToken })
            return { user, accessToken, refreshToken };
        }
        throw new UnauthorizedException('계정 정보가 맞지 않아');
    }

    async findUserByEmail(user_email: string): Promise<User>{
        return await this.UserRepository.findUserByEmail(user_email);
    }

    async getCertificationNumber(){
        // const certNum = Math.floor(Math.random() * (999999 - 0)) + 99999;
        const certNum = 1234
        return {success: true, message: "인증 메일 보내기 성공", answer: certNum}
        // if (await signupMail(certificationNumber, user_email)) {
        // };
    } 
    
    async updateUserProjects(user: User,  project: Project){
        // console.log('111: ', user_email, projectId);
        user.user_projects = [project]
        const data = await this.UserRepository.save(user)
        console.log(data)
        // const newUserProjects = user.user_projects? user.user_projects: [];
        // newUserProjects.push(projectId);
        // user.user_projects = newUserProjects;
        // console.log('2111: ', user);
        // const data = await this.UserRepository.update({user_email}, {user_projects: JSON.stringify(newUserProjects)});
        // console.log('333: ', data);
    }
}
