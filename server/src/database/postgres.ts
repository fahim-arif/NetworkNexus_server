import {DataSource} from 'typeorm'

const connection = new DataSource({
    type:"postgres",
    database:'chat-app',
    entities:[],
    logging:true,
    synchronize:true,
    username:'postgres',
    password:'postgres',
    port: 5432
  })

export default connection