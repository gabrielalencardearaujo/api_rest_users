import { Request, Response } from "express";
import validator from 'validator';
import User from "../models/User";

type ResquestProtocol = {
  name: string;
  email: string;
  password: string;
}

class UserController {
  async index() {
    // Index controller
  }

  async create(req: Request, res: Response) {
    const { email, name, password }: ResquestProtocol = req.body;

    if (email === undefined || name === undefined || password === undefined) {
      res.status(400);
      res.json({ error: 'Informações Inválidas!' });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      res.json({ erro: 'Email inválido!' });
      return;
    }

    const checkEmail = await User.findEmailDatabase(email);

    if (checkEmail) {
      res.status(401);
      res.json({ error: 'Email já cadastrado!' })
      return;
    }

    User.new(name, email, password);

    console.log(req.body);
    res.json('Tudo OK!');
  }
}

export default new UserController;