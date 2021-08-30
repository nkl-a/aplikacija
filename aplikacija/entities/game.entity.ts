import {Column,Entity,Index,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { Word } from "./word.entity";
import { GamePlayer } from "./gamePlayer.entity";

@Index("fk_game_players_id", ["gamePlayersId"], {})
@Index("fk_game_game_type_id", ["gameTypeId"], {})
@Entity("game")
export class Game {
  @PrimaryGeneratedColumn({ type: "int", name: "game_id", unsigned: true })
  gameId: number;

  @Column({type: "int", name: "game_players_id",unsigned: true})
  gamePlayersId: number;

  @Column({type: "int", name: "game_type_id", unsigned: true })
  gameTypeId: number;

  @Column({type: "timestamp", name: "created_at", nullable: true, default: () => "CURRENT_TIMESTAMP",})
  createdAt: Date | null;

  @Column({type: "int", name: "word_id", unsigned: true })
  wordId: number;

  @OneToMany(() => Word, (word) => word.game)
  words: Word[];

  @OneToMany(() => GamePlayer, (gamePlayer) => gamePlayer.game)
  gamePlayers: GamePlayer[];
}
