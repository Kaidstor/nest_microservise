import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";

const config: TypeOrmModuleOptions = {
   type: 'mysql',
  //  host: 'localhost',
   host: process.env.HOST, 
   port: +process.env.PORT,
   username: process.env.USERNAME,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
   entities: [Comment],
   synchronize: true,
 }

 export default config