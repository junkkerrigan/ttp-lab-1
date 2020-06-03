import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../db/models/UserModel';
import {
  RegistrationRequest,
  RegistrationResponse,
} from '../../types/registration';
import { Op } from 'sequelize';

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

router.post<any, RegistrationResponse, RegistrationRequest>(
  '/',
  async (req, res) => {
    const {
      body: { name, email, username, password },
    } = req;
    try {
      const { id } = await req.context.models.User.create<UserModel>({
        name,
        email,
        username,
        password,
      });

      const token = jwt.sign({ id }, req.context.jwtSecret, {
        expiresIn: 60 * 60 * 24,
      });
      return res.status(200).send({
        success: true,
        data: {
          token,
        },
      });
    } catch (e) {
      const message: string = e.errors?.length && e.errors[0].message;

      if (message.includes('isNotEmail')) {
        return res.status(200).send({
          success: false,
          data: {
            badFields: [{ name: 'email', message: 'isNotEmail' }],
          },
        });
      }
      if (message.includes('email')) {
        return res.status(200).send({
          success: false,
          data: {
            badFields: ['email'],
          },
        });
      }
      if (message.includes('username')) {
        return res.status(200).send({
          success: false,
          data: {
            badFields: ['username'],
          },
        });
      }

      return res.status(200).send({
        success: false,
      });
    }
  },
);

export { router as registerRouter };
