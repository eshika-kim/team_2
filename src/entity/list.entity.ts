import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Board } from './board.entity';

@Entity({ schema: 'team2', name: 'list' })
export class List {
  @PrimaryGeneratedColumn()
  list_id: number;

  @OneToMany(() => Card, (card) => card.list_id)
  card: Card[];

  @ManyToOne(() => Board)
  @JoinColumn({ name: 'board_id' })
  board_id: number;

  @Column('varchar', { length: 10 })
  name: string;

  @Column()
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
