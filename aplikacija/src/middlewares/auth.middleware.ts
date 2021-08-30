import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { PlayerService } from "src/services/player/player.service";
import * as jwt from 'jsonwebtoken'
import { JwtDataPlayerDto } from "src/dtos/jwt.data.player.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "entities/player.entity";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    
    constructor(private readonly playerService: PlayerService) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        
        if(!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
        }

        const token = req.headers.authorization.split(' ')[1];

        const jwtData: JwtDataPlayerDto = jwt.verify(token, 'MOJ_TAJNI_STRING');
        if(!jwtData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED)
        }

        if(jwtData.ip !== req.ip.toString())
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED)
        
        if(jwtData.ua !== req.headers["user-agent"])
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED)

        const player = await this.playerService.getById(jwtData.playerId);

        if(!player){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED)
        }

        
        const trenutno = new Date().getTime() / 1000;
        
        if(trenutno >= jwtData.ext)
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED)


        next();
    }


}