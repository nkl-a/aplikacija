import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "entities/player.entity";
import { AddPlayerDTO } from "src/dtos/add.player.dto";
import { Repository } from "typeorm";
import { EditPlayerDTO } from "src/dtos/edit.player.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { resolve } from "path/posix";

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly player: Repository<Player>
    ) {}

    getAll() :Promise<Player[]> {
        return this.player.find()
    }

    async getById(id: number): Promise<Player | ApiResponse> {
        let player: Player = await this.player.findOne(id);
        
        if(player === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002, "Korisnik sa ovim id-jem ne postoji"))
            });
        }

        return player;
    }

    async getByUsername(username: string): Promise<Player | null> {
        let player: Player = await this.player.findOne({username});

        if(player) {
            return player;
        } else {
            return null;
        }
    }

    add(dto: AddPlayerDTO): Promise<Player | ApiResponse> {
        let newPlayer: Player = new Player();
        newPlayer.username = dto.username;
        newPlayer.passwordHash = this.priparePassword(dto.password)

        return new Promise((resolve) => {
            this.player.save(newPlayer)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -1001, "Izabrani username vec postoji");
                resolve(response);
            })
        })

    }

    async edit(id: number, dto: EditPlayerDTO): Promise<Player  | ApiResponse> {
        let player: Player = await this.player.findOne(id);
        
        if(player === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002, "Korisnik sa ovim id-jem ne postoji"))
            });
        }

        player.passwordHash = this.priparePassword(dto.password)
        
        return this.player.save(player);
       
    }


    priparePassword(pass: string) : string{
        const crypto = require('crypto');
        const passHash = crypto.createHash('sha512')
        passHash.update(pass);
        return passHash.digest('hex').toUpperCase();
    }

}

