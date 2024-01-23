import { Request, Response } from "express";
import validator from 'validator';
import User from "../models/User";

type ResquestProtocol = {
  name: string;
  email: string;
  password: string;
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

    if (checkEmail) {
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
    
    if(!user) return undefined;
    
    const editUser = {
      id: Number(id),
      email: '',
      name: '',
      role: 0
    };
    
    if(validator.isEmail(email)) {
      if(email !== user.email) {
        const checkEmail = await User.findEmailDatabase(email);
        if(checkEmail) {
          res.status(401)
          res.json({ info: 'Email exists!' })
          return;
        } 
      } 

      editUser.email = email;
    }

    if(name) editUser.name = name
    else {
      res.status(401);
      res.json({ info: 'Insert a name!' })
      return;
    }

    if(role && !isNaN(role)) editUser.role = Number(role)
    else {
      res.status(401);
      res.json({ info: 'Invalid Role' })
      return;
    }

    const realeseUpdate = await User.updateUser(editUser)

    if(realeseUpdate) {
      res.status(200);
      res.json({info: 'Update user with success'});  
    } else {
      res.status(500);
      res.json({info: 'Server with problems'});  
    }
  }
}

export default new UserController;