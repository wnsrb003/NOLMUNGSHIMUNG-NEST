import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ) {
        // super({
        //     secretOrKey: process.env.USER,
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        // })
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    console.log(request?.cookies?.w_access)
                  return request?.cookies?.w_access;
                },
              ]),
            secretOrKey: process.env.USER
        });
        
    }

    async validate(payload) {
        const { user_email } = payload;
        const user: User = await this.UserRepository.findOne({user_email});

        if (!user) throw new UnauthorizedException;
        return user;
    }
}