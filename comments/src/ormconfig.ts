import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";

const config: TypeOrmModuleOptions = {
   type: 'mysql',
  //  host: 'localhost',
   host: 'db_comments',
   port: 3306,
   username: 'root',
   password: 'example',
   database: 'comment',
   entities: [Comment],
   synchronize: true,
 }

 export default config