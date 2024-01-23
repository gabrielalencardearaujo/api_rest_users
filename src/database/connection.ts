import knex from 'knex';
import { config } from 'dotenv';
config();

knex({
  client: 'mysql2',
  connection: {
    host: process.env.LOCAL,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'API_Users'
  }
});

export default knex;
