import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../db/models/UserModel';
import {
  AuthenticationRequest,
  AuthenticationResponse,
} from '../../types/authentication';

const router = Router();

router.get('/createUser', async (req, res) => {
  try {
    const { cUsername, cPassword } = req.query;
    if (cUsername && cPassword) {
      await req.context.models.User.create({
        username: cUsername,
        password: cPassword,
      });
    }
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

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
            incorrectFields: ['username'],
          },
        });
      }

      const { password: encryptedPassword } = user;
      const isPasswordMatch = await bcrypt.compare(password, encryptedPassword);
      if (!isPasswordMatch) {
        return res.status(200).send({
          success: false,
          data: {
            incorrectFields: ['password'],
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
