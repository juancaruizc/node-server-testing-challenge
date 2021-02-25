const db = require('../../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db('aliens');
}

function getById(id) {
  return null;
}

async function insert(alien) {
  const [id] = await db('aliens').insert(alien);
  return db('aliens').where({ id }).first();
}

async function update(id, changes) {
  return db('aliens').update(changes).where({ id });
}

function remove(id) {
  return null;
}
