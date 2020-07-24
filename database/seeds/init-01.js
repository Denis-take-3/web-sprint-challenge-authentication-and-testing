exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'user-1', password: 'pass-1' },
        { id: 2, username: 'user-2', password: 'pass-2' },
        { id: 3, username: 'user-3', password: 'pass-3' },
      ]);
    });
};
