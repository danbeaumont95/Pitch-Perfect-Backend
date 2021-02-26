
// import model functions here
const { exampleModelFunc } = require("../models/example.model.js")

exports.exampleControllerFunc = (req, res, next) => {
    exampleModelFunc();
}
