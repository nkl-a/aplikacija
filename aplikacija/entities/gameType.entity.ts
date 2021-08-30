import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_type")
export class GameType {
  @PrimaryGeneratedColumn({ type: "int", name: "game_type_id", unsigned: true })
  gameTypeId: number;

  @Column({type: "varchar", name: "name", length: 50})
  name: string;
}
