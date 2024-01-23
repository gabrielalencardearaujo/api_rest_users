import { Request, Response } from "express";

class UserController {
  async index() {
    // Index controller
  }

  async create(req: Request, res: Response) {
    console.log(req.body);
    res.send('Corpo da requisicao')
  }
}

export default new UserController;