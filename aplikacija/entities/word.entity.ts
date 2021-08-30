import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./game.entity";
import { Latters } from "./latters.entity";

@Index("fk_words_game_id", ["gameId"], {})
@Entity("word", { schema: "aplikacija" })
export class Word {
  @PrimaryGeneratedColumn({ type: "int", name: "word_id", unsigned: true })
  wordId: number;

  @Column({type: "int", name: "game_id", unsigned: true})
  gameId: number;

  @Column({type: "varchar", length: 50})
  word: string;

  @ManyToOne(() => Game, (game) => game.words, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "gameId" }])
  game: Game;

  @OneToMany(() => Latters, (latters) => latters.word)
  latters: Latters[];
}
