import CreateUserDTO from '../dto/create_user.dto';
import { NextFunction, Request, Response } from "express"
import validator from 'validator'

export const validateCreateUserData = (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body as CreateUserDTO

  if (!validator.isEmail(userData.email)) {
    throw {name: 'ValidationError', message: 'Email format is not valid'}
  }
  next()
}