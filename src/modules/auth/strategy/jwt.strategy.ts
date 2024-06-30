import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/modules/prisma/prisma.service";


export class JwtStrategy extends PassportStrategy(
    Strategy,"jwt"
){
    constructor (private prisma:PrismaService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.SECRET
        })
    }

    async validate(payload:{sub:number;email:string}){
        const user= await this.prisma.user.findFirst({
            where:{
                id:payload.sub
            }
        });

        if(!user){
            console.log("User not found: " + payload);
            throw new UnauthorizedException("User not found" )
            
        }

        // We don't want to send the password in the token
        delete user.password;

        return user;
    }
    
}