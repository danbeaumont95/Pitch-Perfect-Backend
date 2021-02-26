exports.up = function (knex) {
  return knex.schema.createTable("camping_history", (camping_historyTable) => {
    camping_historyTable.increments("history_id").primary();
    camping_historyTable
      .string("username")
      .references("users.username")
      .notNullable();
    camping_historyTable.timestamp("date").notNullable();
    camping_historyTable
      .integer("place_id")
      .references("campsites.place_id")
      .notNullable();
    camping_historyTable.float("votes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("camping_history");
};
