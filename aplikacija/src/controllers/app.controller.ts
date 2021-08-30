import { Controller, Get } from '@nestjs/common';
import { Game } from 'entities/game.entity';
import { GameService } from '../services/game/game.service';


@Controller()
export class AppController {
  constructor(
    private gameService: GameService
  ) { }

  @Get()
  getHello(): string {
    return 'Hello world';
  }

  
}
