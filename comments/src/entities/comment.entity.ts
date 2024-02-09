import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('comments')
export class Comment {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'bigint', nullable: false })
   userId: number;

   @Column({ nullable: false })
   comment: string;
}