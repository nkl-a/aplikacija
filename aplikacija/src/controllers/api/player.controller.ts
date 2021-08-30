import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Player } from "entities/player.entity";
import { AddPlayerDTO } from "src/dtos/add.player.dto";
import { EditPlayerDTO } from "src/dtos/edit.player.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { PlayerService } from "src/services/player/player.service";


@Controller('/api/player')
export class PlayerController {
    constructor(
        private playerService: PlayerService
    ) {}

    @Get('')
    getAll() :Promise<Player[]> {
        return  this.playerService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: number) :Promise<Player | ApiResponse> {
        return  this.playerService.getById(id);
    }

    @Post('/add')
    add(@Body() data : AddPlayerDTO) :Promise<Player | ApiResponse>{
        return this.playerService.add(data);
    } 

    @Put('/:id')
    edit(@Param('id') id: number, @Body() data : EditPlayerDTO) :Promise<Player | ApiResponse>{
        return this.playerService.edit(id, data);
    } 


}