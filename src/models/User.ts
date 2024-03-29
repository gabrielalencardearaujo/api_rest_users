import knex from '../database/connection';
import bcrypt from 'bcrypt';

type BodyUserProtocol = {
  id: number,
  name: string,
  email: string,
  role: number,
}

interface UserProtocol {
  new: (name: string, email: string, password: string, role: number) => void;
}

class User implements UserProtocol {

  async findAllUsers() {
    try {
      return await knex.select(["id", "email", "name", "role"]).table('users');
    } catch (err) {
      console.error('Error ao pesquisar todos os usuario:', err)
      return undefined;
    }
  }

  async findById(id: number | string) {
    try {
      const user = await knex
        .select(["id", "email", "name", "role"])
        .where({ id })
        .table('users');

        if(user.length > 0) return user[0];
        else return undefined;
        
    } catch (err) {
      console.error('Error ao pesquisar todos os usuario:', err)
      return undefined;
    }
  }

  async new(name: string, email: string, password: string, role: number) {
    try {

      const hash: string = await bcrypt.hash(password, 10);

      await knex.insert({
        email,
        name,
        password: hash,
        role,
      })
        .table('users')
    } catch (err) {
      console.error(err);
    }
  }

  async findEmailDatabase(email: string, pass?: boolean) {
    try {
      let result;
      if(pass) {
        result = await knex
          .select()
          .table('users')
          .where({ email });
      } else {
        result = await knex
          .select(['id', 'name', 'email', 'role'])
          .table('users')
          .where({ email });
      }

      if (result.length > 0) return result
      else return [];

    } catch (err) {
      console.error('Error: ', err);
      return [];
    }
  }

  async updateUser(body: BodyUserProtocol) {
    try {
      const result = await knex.update(body).where({id: body.id}).table('users');
      console.log(result);
      return true;
    } catch(err) {
      console.error('Error:', err)
      return false;
    }
  }

  async deleteUserById(id: number) {
    try {
      await knex.delete().where({id}).table('users');
      return true;
    }catch(err) {
      console.error('Error:', err);
      return false;
    }
  }
}

export default new User;