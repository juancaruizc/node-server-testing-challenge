const aliens = require('./aliens-model.js');
const db = require('../../data/dbConfig.js');

const steve = { name: 'steve' };
const bill = { name: 'bill' };

it('correct env', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

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

describe('aliens model', () => {
  describe('insert function', () => {
    it('adds hobbit to db', async () => {
      let all;
      await aliens.insert(steve);
      all = await db('aliens');
      expect(all).toHaveLength(1);

      await aliens.insert(bill);
      all = await db('aliens');
      expect(all).toHaveLength(2);
    });
    it('values of aliens from db', async () => {
      const hobbit = await aliens.insert(steve);
      expect(hobbit).toMatchObject({ id: 1, ...steve });
    });
    describe('update function', () => {
      it('updates the hobbit', async () => {
        const [id] = await db('aliens').insert(steve);
        await aliens.update(id, { name: 'STEVE' });
        const updated = await db('aliens').where({ id }).first();
        expect(updated.name).toBe('STEVE');
      });
      it('check the updated hobbit', async () => {
        const [id] = await db('aliens').insert(steve);
        await aliens.update(id, { name: 'STEVE' });
        const updated = await db('aliens').where({ id }).first();
        expect(updated).toMatchObject({ id: id, name: 'STEVE' });
      });
    });
  });
});
