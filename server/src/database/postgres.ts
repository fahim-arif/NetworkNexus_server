import {DataSource} from 'typeorm'

import { User } from '../entities';


const postgres = new DataSource({
  type: "postgres",
  database: "chat-app",
  entities: [User],
  // logging: true,
  synchronize: true,
  username: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
});

export default postgres