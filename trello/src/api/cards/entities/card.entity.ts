import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Exclude } from 'class-transformer';

export enum Status {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

@Entity()
export class Card {
  constructor(partial: Partial<Card>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'float4', nullable: true })
  estimate: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TODO,
  })
  status: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'text', array: true, default: [] })
  labels: string[];

  @Column({ type: 'uuid' })
  boardId: string;

  @Exclude()
  @ManyToOne(() => Board, (board) => board.cards, { onDelete: 'CASCADE' })
  board: Board;
}
