const ENV = process.env.NODE_ENV || "development";

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
      database: "pitch_perfect_dev",
      // user,
      // password
    },
  },
  test: {
    connection: {
      database: "pitch_perfect_test",
      // user,
      // password
    },
  },
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
