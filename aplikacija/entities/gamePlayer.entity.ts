import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { Player } from "./player.entity";
import { Game } from "./game.entity";

@Index("fk_game_player_player_id", ["playerId"], {})
@Index("fk_game_player_game_id", ["gameId"], {})
@Entity("game_player")
export class GamePlayer {
  @PrimaryGeneratedColumn({type: "int", name: "game_player_id", unsigned: true})
  gamePlayerId: number;

  @Column({type: "int", name: "player_id", unsigned: true})
  playerId: number;

  @Column({type: "int", name: "game_id", unsigned: true})
  gameId: number;

  @ManyToOne(() => Player, (player) => player.gamePlayers, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "player_id", referencedColumnName: "playerId" }])
  player: Player;

  @ManyToOne(() => Game, (game) => game.gamePlayers, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "gameId" }])
  game: Game;
}
