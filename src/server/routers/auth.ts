import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../db/models/UserModel';
import {
  AuthenticationRequest,
  AuthenticationResponse,
} from '../../types/authentication';

const router = Router();

router.post<any, AuthenticationResponse, AuthenticationRequest>(
  '/',
  async (req, res) => {
    const {
      body: { username, password },
    } = req;
    try {
      const user = await req.context.models.User.findOne<UserModel>({
        where: {
          username,
        },
      });
      if (!user) {
        return res.status(200).send({
          success: false,
          data: {
            badFields: ['username'],
          },
        });
      }

      const { password: encryptedPassword } = user;
      const isPasswordMatch = await bcrypt.compare(password, encryptedPassword);
      if (!isPasswordMatch) {
        return res.status(200).send({
          success: false,
          data: {
            badFields: ['password'],
          },
        });
      }

      const token = jwt.sign({ username }, req.context.jwtSecret, {
        expiresIn: 60 * 60 * 24,
      });
      return res.status(200).send({
        success: true,
        data: {
          token,
        },
      });
    } catch (e) {
      return res.status(200).send({
        success: false,
      });
    }
  },
);

export { router as authRouter };
