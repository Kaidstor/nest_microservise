import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('users')
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ nullable: false })
   name: string;
   
   @Column({ nullable: false })
   role: string;

   @Column({ nullable: false, unique: true })
   email: string;

   @Column({ nullable: false })
   password: string;

   @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
   }
}