exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary();
    usersTable.string("password").notNullable();
    usersTable.string("firstname").notNullable();
    usersTable.string("lastname").notNullable();
    usersTable.string("avatar_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
