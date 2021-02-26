exports.up = function (knex) {
  return knex.schema.createTable("owners", (ownersTable) => {
    ownersTable.string("owner_username").primary();
    ownersTable.string("password").notNullable();
    ownersTable.string("firstname");
    ownersTable.string("lastname");
    ownersTable.string("avatar_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("owners");
};
