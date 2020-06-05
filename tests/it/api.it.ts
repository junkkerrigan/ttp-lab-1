import { app } from '../../src/server/app';
import { ApiDriver } from '../drivers/api.driver';
import { validJwtToken } from '../mocks/mocks';

describe('api', () => {
  const driver = new ApiDriver(app);

  it('should return status 401 if authorization token is not passed', async () => {
    await driver.when.getRequestSent('/events/getByUser').then((res) => {
      expect(res.status).toEqual(401);
    });
  });

  describe('events', () => {
    it('should insert event into database', async () => {
      driver.given.authorizationToken(validJwtToken);
      await driver.given.user({
        username: 'username',
        password: 'password',
        email: 'email@email.com',
      });

      await driver.when
        .postRequestSent('/events', {
          name: 'test event',
        })
        .expect(201);
    });

    it('should retrieve events for current user from database', async () => {
      driver.given.authorizationToken(validJwtToken);
      await driver.given.user({
        username: 'username',
        password: 'password',
        email: 'email@email.com',
      });

      await driver.when.postRequestSent('/events', {
        name: 'test event',
      });
      await driver.when.getRequestSent('/events/getByUser').then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toEqual('test event');
      });
    });
  });

  describe('guilds', () => {
    it('should return 400 when user has no guild', async () => {
      driver.given.authorizationToken(validJwtToken);
      await driver.given.user({
        username: 'username',
        password: 'password',
        email: 'email@email.com',
      });

      await driver.when.getRequestSent('/guilds/userGuild').expect(400);
    });

    it('should insert guild into database', async () => {
      driver.given.authorizationToken(validJwtToken);
      await driver.given.user({
        username: 'username',
        password: 'password',
        email: 'email@email.com',
      });

      await driver.when
        .postRequestSent('/guilds', {
          name: 'test guild',
        })
        .expect(201);
      await driver.when.getRequestSent('/guilds/userGuild').then((res) => {
        expect(res.body.name).toEqual('test guild');
      });
    });

    it('should include data about event that is interesting for guild into guild data', async () => {
      driver.given.authorizationToken(validJwtToken);
      await driver.given.user({
        username: 'username',
        password: 'password',
        email: 'email@email.com',
      });

      await driver.when.postRequestSent('/guilds', {
        name: 'test guild',
      });
      await driver.when.postRequestSent('/events', {
        name: 'test event',
        interestedGuildIds: [1],
      });

      await driver.when.getRequestSent('/guilds/userGuild').then((res) => {
        expect(res.body.interestingEventIds).toEqual(['1']);
      });
    });
  });
});
