import { Request, Response } from "express";

class HomeController {
  async home(req: Request, res: Response) {
    res.send('API Rest com Knex e Typescript! Curso NodeJS!')
  }
}

export default new HomeController;