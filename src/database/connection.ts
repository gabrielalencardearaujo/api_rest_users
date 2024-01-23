import knex from 'knex';
import { config } from 'dotenv';
config();

export default knex({
  client: 'mysql2',
  connection: {
    host: process.env.LOCAL,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: 'API_Users'
  }
});
