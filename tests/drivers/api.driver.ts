import { syncSequelize, models } from '../../src/db';
import supertest from 'supertest';

export class ApiDriver {
  private headers: Record<string, any> = {};

  constructor(private readonly app: any) {}

  given = {
    authorizationToken: (token: string) => {
      this.headers = {
        ...this.headers,
        Token: token,
      };
    },
    user: async (userData: any) => {
      await syncSequelize({
        force: true,
      });
      await models.User.create(userData);
    },
  };

  when = {
    getRequestSent: (url: string) => {
      url = `/_api/v1${url}`;

      const request = supertest(this.app).get(url);
      for (const [name, value] of Object.entries(this.headers)) {
        request.set(name, value);
      }

      return request;
    },
    postRequestSent: (url: string, body: any) => {
      url = `/_api/v1${url}`;

      const request = supertest(this.app).post(url);
      for (const [name, value] of Object.entries(this.headers)) {
        request.set(name, value);
      }

      return request.send(body);
    },
  };
}
