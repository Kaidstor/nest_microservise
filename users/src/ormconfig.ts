import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

const config: TypeOrmModuleOptions = {
   type: 'mysql',
  //  host: 'localhost',
   host: process.env.HOST, 
   port: +process.env.PORT,
   username: process.env.USERNAME,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
   entities: [User],
   synchronize: true,
 }

 export default config