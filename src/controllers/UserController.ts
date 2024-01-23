import { config } from 'dotenv';
config();
import { Request, Response } from "express";
import validator from 'validator';
import User from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const secret = process.env.SECRET || 'basvidyqsiuabduqwbduwidshqid';

type ResquestProtocol = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: number;
}

class UserController {

  async index(req: Request, res: Response) {
    const listUsers = await User.findAllUsers();
    res.json(listUsers);
  }

  async findUser(req: Request, res: Response) {
    const { id } = req.params;
    const result = await User.findById(id);

    if (result) {
      res.status(200);
      res.json(result)
    } else {
      res.status(404);
      res.json({ info: 'User not found!' })
    }
  }

  async create(req: Request, res: Response) {
    const { email, name, password }: ResquestProtocol = req.body;

    if (email === undefined || name === undefined || password === undefined) {
      res.status(400);
      res.json({ info: 'Invalid fields' });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      res.json({ erro: 'Invalid email!' });
      return;
    }

    const checkEmail = await User.findEmailDatabase(email);

    if (checkEmail.length > 0) {
      res.status(401);
      res.json({ info: 'Email exists' })
      return;
    }

    User.new(name, email, password);

    console.log(req.body);
    res.json('Tudo OK!');
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findById(id);

    if (!user) return undefined;

    const editUser = {
      id: Number(id),
      email: '',
      name: '',
      role: 0
    };

    if (validator.isEmail(email)) {
      if (email !== user.email) {
        const checkEmail = await User.findEmailDatabase(email);
        if (checkEmail.length > 0) {
          res.status(401)
          res.json({ info: 'Email exists!' })
          return;
        }
      }

      editUser.email = email;
    }

    if (name) editUser.name = name
    else {
      res.status(401);
      res.json({ info: 'Insert a name!' })
      return;
    }

    if (role && !Number.isNaN(role)) editUser.role = Number(role)
    else {
      res.status(401);
      res.json({ info: 'Invalid Role' })
      return;
    }

    const realeseUpdate = await User.updateUser(editUser)

    if (realeseUpdate) {
      res.status(200);
      res.json({ info: 'Update user with success' });
    } else {
      res.status(500);
      res.json({ info: 'Server with problems' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (id && !Number.isNaN(id)) {
      const findUser = await User.findById(id);

      if (findUser) {
        await User.deleteUserById(+id);
        res.status(200)
        res.json({ info: 'User delete with success!' })
      } else {
        res.status(404);
        res.json({ info: 'User not found!' })
      }
    } else {
      res.status(400);
      res.json({ info: 'Invalid id!' })
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user: ResquestProtocol[]  = await User.findEmailDatabase(email, true);

    if (user.length > 0 && user[0].password) {
     const result = await bcrypt.compare(password, user[0]?.password);

     if(result) {
      const token = jwt.sign({email: user[0].email, role: user[0].role}, secret);

      res.status(200);
      res.json({
        info: 'Sign in success!', 
        token,})

     } else {
      res.status(200);
      res.json({info: 'Email or Password invalid!'})
     }

    } else {
      res.status(404);
      res.json({info: 'User not exist.'})
    }
  }
}

export default new UserController;