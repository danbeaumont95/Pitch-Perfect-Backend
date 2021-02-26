exports.up = function (knex) {
  return knex.schema.createTable("reviews", (reviewsTable) => {
    reviewsTable.increments("review_id").primary();
    reviewsTable.string("username").references("users.username").notNullable();
    reviewsTable.string("campsite_name").notNullable();
    reviewsTable.text("review").notNullable();
    reviewsTable.timestamp("created_at").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
