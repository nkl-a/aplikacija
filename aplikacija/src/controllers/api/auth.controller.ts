import { Body, Controller, Post, Req } from "@nestjs/common";
import { LoginInfoPlayerDto } from "src/dtos/login.info.player.dto";
import { LoginPlayerDTO } from "src/dtos/login.player.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PlayerService } from "src/services/player/player.service";
import * as jwt from 'jsonwebtoken'
import { JwtDataPlayerDto } from "src/dtos/jwt.data.player.dto";
import { Request } from "express";

@Controller('auth')
export class AuthController {

    constructor(public playerService: PlayerService) {}

    @Post('/login')
    async doLogin(@Body() dto: LoginPlayerDTO, @Req() req: Request) :Promise<ApiResponse | LoginInfoPlayerDto>{
        const player = await this.playerService.getByUsername(dto.username);

        if(!player) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -3001, "Ne postoji igrac sa ovim username-om"))
            });
        }
        
        const crypto = require('crypto');
        const passHash = crypto.createHash('sha512')
        passHash.update(dto.password);
        const passHashString = passHash.digest('hex').toUpperCase();

        if(player.passwordHash !== passHashString) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -3001, "Password nije ispravan"))
            });

            
        }


        const jwtData = new JwtDataPlayerDto();
        jwtData.playerId = player.playerId;
        jwtData.username = player.username;
        let sada = new Date();
        sada.setDate(sada.getDate() + 14)
        jwtData.ext = sada.getTime() / 1000;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];


        let token: string = jwt.sign(jwtData.toPlainObj(), 'MOJ_TAJNI_STRING');

        const resposneObj =  new LoginInfoPlayerDto(
            player.playerId,
            player.username,
            token
        )

        return new Promise(resolve => resolve(resposneObj))


    }
}