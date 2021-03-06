exports.up = function (knex) {
  return knex.schema.createTable("owners", (ownersTable) => {
    ownersTable.string("owner_username").primary();
    ownersTable.string("password").notNullable();
    ownersTable.string("firstname").notNullable();
    ownersTable.string("lastname").notNullable();
    ownersTable.string("avatar_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("owners");
};
