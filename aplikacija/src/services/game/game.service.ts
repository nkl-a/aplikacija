import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game) private readonly game: Repository<Game>
        
        ){}

        getAll() :Promise<Game[]> {
            return this.game.find();   // vraca sve rekorde
        }

        getById(id: number): Promise<Game> {
            // SELECT * FROM APLIKACIJA.GAME WHERE GAME.ID = ?
            return this.game.findOne(id)  // trazi vrednost primarnog kljuca
        }

        addNewGame(id: number): Promise<Game> {
            // SELECT * FROM APLIKACIJA.GAME WHERE GAME.ID = ?
            return this.game.findOne(id)  // trazi vrednost primarnog kljuca
        }

   


}
