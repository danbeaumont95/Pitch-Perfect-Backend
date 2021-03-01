const ENV = process.env.NODE_ENV || "development";
const testData = require("./test_data");
const devData = require("./development_data");
const data = {
  test: testData,
  development: devData,
  production: devData,
};

module.exports = data[ENV];
