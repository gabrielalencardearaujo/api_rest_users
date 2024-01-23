import knex from '../database/connection';
import bcrypt from 'bcrypt';

interface UserProtocol {
  new: (name: string, email: string, password: string) => void;
}

class User implements UserProtocol {
  async new(name: string, email: string, password: string) {
    try {

      const hash: string = await bcrypt.hash(password, 10);

      await knex.insert({
        email,
        name,
        password: hash,
        role: 0,
      })
        .table('users')
    } catch (err) {
      console.error(err);
    }
  }

  async findEmailDatabase(email?: string) {
    try {
      const result = await knex.select()
        .table('users')
        .where({ email });

      if (result.length > 0) return true
      else return false;

    } catch (err) {
      console.error('Error: ', err);
    }
  }
}

export default new User;