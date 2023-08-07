import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity({ schema: 'team2', name: 'list' })
export class List {
  @PrimaryGeneratedColumn()
  list_id: number;

  @OneToMany(() => Card, (card) => card.list_id)
  card: Card[];

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
