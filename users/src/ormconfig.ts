import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

const config: TypeOrmModuleOptions = {
   type: 'mysql',
   host: 'db',
   port: 3306,
   username: 'root',
   password: 'example',
   database: 'user',
   entities: [User],
   synchronize: true,
 }

 export default config 