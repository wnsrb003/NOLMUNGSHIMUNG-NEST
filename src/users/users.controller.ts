import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AuthService } from './users.service';
import { AuthCredentialDto } from '../users/dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as cookie from 'cookie';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() AuthCredentialDto: AuthCredentialDto): object{
        console.log(`sign up : ${JSON.stringify(AuthCredentialDto)}`);
        
        const user = this.authService.signUp(AuthCredentialDto);
        if (!user) throw new InternalServerErrorException('회원가입에 실패했어.');
        return {
            success: true,
            message: "회원가입 인증 메일을 보냈습니다",
        };
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async siginIn(
        @Body() AuthLoginDto: AuthLoginDto, 
        @Res() res: Response) {
            const { user, accessToken} = await this.authService.signIn(AuthLoginDto, res);
            console.log(accessToken);
            
            res.setHeader("Set-Cookie", [
                // cookie.serialize(
                //   "w_refresh",
                //   user.userRefreshToken,
                //   refreshTokenOptions
                // ),
                cookie.serialize(
                    "w_access",
                    accessToken
                ),
            ]);
            return res.status(200).json({
                loginSuccess: true,
                user: user,
                user_email: user.user_email,
                user_name: user.user_name,
                user_projects: user.user_projects,
                message: "성공적으로 로그인했습니다.",
              })
    }

    @Post('/mail')
    async checkEmail(@Body() user_email: string){
        const user = await this.authService.findUserByEmail(user_email);
        console.log(user);
        
        if(user) throw new BadRequestException('동일한 이메일이 있어.');
        return this.authService.getCertificationNumber()
    }

    @Get('/auth')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        return {
            success: true,
            user_name: user,
            isAuth: true,
        }
    }
}


