import { Request, Response } from "express";

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

    if(email === undefined || name === undefined || password === undefined) {
      res.status(400);
      res.json({error: 'Informações Inválidas!'})
    }

    // console.log(req.body);
    // res.json('Tudo OK!')
  }
}

export default new UserController;