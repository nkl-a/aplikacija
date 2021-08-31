import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Game } from "entities/game.entity";
import { Player } from "entities/player.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { GameService } from "src/services/game/game.service";


@Controller('/api/player')
export class PlayerController {
    constructor(
        private gameService: GameService
    ) {}

    @Get('')
    getAll() :Promise<Game[]> {
        return  this.gameService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: number) :Promise<Game | ApiResponse> {
        return  this.gameService.getById(id);
    }

    @Post('/add')
    add(@Param('name') name: number) :Promise<Game | ApiResponse>{
        return this.gameService.addNewGame(name);
    } 




}