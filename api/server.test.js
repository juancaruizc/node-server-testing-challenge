const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server.js');

const steve = { name: 'steve' };
const bill = { name: 'bill' };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('aliens').truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe('server', () => {
  describe('[GET] /aliens', () => {
    it('resopnds with 200 status', async () => {
      const res = await request(server).get('/aliens');
      expect(res.status).toBe(200);
    });
    it('returns correct num of aliens', async () => {
      let res;
      await db('aliens').insert(steve);
      res = await request(server).get('/aliens');
      expect(res.body).toHaveLength(1);
      //expect(res.body).toEqual({})

      await db('aliens').insert(bill);
      res = await request(server).get('/aliens');
      expect(res.body).toHaveLength(2);
    });
    it('returns correct hobbit format', async () => {
      await db('aliens').insert(steve);
      await db('aliens').insert(bill);
      const res = await request(server).get('/aliens');
      expect(res.body[0]).toMatchObject({ id: 1, ...steve });
      expect(res.body[1]).toMatchObject({ id: 2, ...bill });
    });
  });
  describe('[POST] /aliens', () => {
    it('responds with  newly created hobbit', async () => {
      let res;
      res = await request(server).post('/aliens').send(steve);
      expect(res.body).toMatchObject({ id: 1, ...steve });

      res = await request(server).post('/aliens').send(bill);
      expect(res.body).toMatchObject({ id: 2, ...bill });
    });
  });
});
