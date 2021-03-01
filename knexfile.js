const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

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
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  development: {
    connection: {
      database: "pitch_perfect_dev",
    },
  },
  test: {
    connection: {
      database: "pitch_perfect_test",
    },
  },
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
