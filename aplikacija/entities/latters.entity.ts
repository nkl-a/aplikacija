import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { Word } from "./word.entity";

@Index("fk_latters_word_id", ["wordId"], {})
@Entity("latters")
export class Latters {
  @PrimaryGeneratedColumn({ type: "int", name: "latter_id", unsigned: true })
  latterId: number;

  @Column({type: "varchar", name: "latter", length: 2})
  latter: string;

  @Column({type: "int", name: "word_id", unsigned: true})
  wordId: number;

  @Column({type: "int", name: "hit"})
  hit: number;

  @ManyToOne(() => Word, (word) => word.latters, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "word_id", referencedColumnName: "wordId" }])
  word: Word;
}
