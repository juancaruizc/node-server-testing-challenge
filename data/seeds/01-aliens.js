exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('aliens')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('aliens').insert([
        { name: 'steve' },
        { name: 'bill' },
        { name: 'elon' },
        { name: 'jeff' },
      ]);
    });
};
