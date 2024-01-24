import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { secret } from "../controllers/UserController"; 

class MiddlewareLogin {

  async AdminAuth(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers['authorization'];
    try {
      if(authToken) {
        const bearer = authToken.split(' ');
        const token = bearer[1]; 
    
        const decoded = jwt.verify(token, secret) as JwtPayload;

        if(decoded && decoded.role === Number(1)) {
          next()
        }else {
          res.status(403);
          res.json({
            info: 'User not Authorized'
          })
        }

      } else {
        res.status(403);
        res.json({info: 'Send the token for authorization'});
        return;
      }
    } catch (error) {
      res.status(500)
      res.json({info: 'Invalid Token!'})
      return;
    }
  }
}

export default new MiddlewareLogin;