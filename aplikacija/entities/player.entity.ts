import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GamePlayer } from "./gamePlayer.entity";

@Index("uq_player_username", ["username"], { unique: true })
@Entity("player")
export class Player {
  @PrimaryGeneratedColumn({ type: "int", name: "player_id", unsigned: true })
  playerId: number;

  @Column({ type: "varchar", unique: true,length: 32,})
  username: string;

  @Column({ type: "varchar", name: "password_hash", length: 128})
  passwordHash: string;

  @OneToMany(() => GamePlayer, (gamePlayer) => gamePlayer.player)
  gamePlayers: GamePlayer[];
}
