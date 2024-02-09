import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

   constructor(@InjectRepository(User) private userRepository: Repository<User>){}

   async findOne(id: number){
      return await this.userRepository.findOne({where: {id}});
   }

   async find(){
      return await this.userRepository.find();
   }

   async findOneByEmail(email: string){
      return await this.userRepository.findOne({where: {email}});
   }

   async create(createUserDto: CreateUserDto){
      const {email} = createUserDto;
      const user = await this.userRepository.findOne({where: {email}});

      if (user) 
         return {status: 'error', message: 'User already exists'};

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser)
   }
}
 