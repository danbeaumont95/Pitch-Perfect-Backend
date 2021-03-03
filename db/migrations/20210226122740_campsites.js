exports.up = function (knex) {
  return knex.schema.createTable("campsites", (campsitesTable) => {
    campsitesTable.string("place_id").primary();
    campsitesTable
      .string("owner_username")
      .references("owners.owner_username")
      .notNullable();
    campsitesTable.string("campsite_name").notNullable();
    campsitesTable.string("campsite_address").notNullable();
    campsitesTable.text("booked_dates");
    campsitesTable.float("votes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("campsites");
};
