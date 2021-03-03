exports.up = function (knex) {
  return knex.schema.createTable("reviews", (reviewsTable) => {
    reviewsTable.increments("review_id").primary();
    reviewsTable.string("username").references("users.username").notNullable();
    reviewsTable
      .string("place_id")
      .references("campsites.place_id")
      .notNullable();
    reviewsTable.text("review").notNullable();
    reviewsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
