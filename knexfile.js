
const ENV = process.env.NODE_ENV || "development";
// please make sure the following info is correct

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
      development: {
        connection: {
          database: "",
          // user,
          // password
        },
      },
      test: {
        connection: {
          database: "",
          // user,
          // password
        },
      },
}

module.exports = {...baseConfig, ...customConfig[ENV]};
    