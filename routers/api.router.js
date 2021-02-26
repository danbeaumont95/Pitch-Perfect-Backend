
const apiRouter = require('express').Router();
const { exampleControllerFunc } =require("../controllers/example.controller")
//const router_name = require('router_path')
    
//apiRouter.use('/endpoint', router_name);
apiRouter.route('/')
         .get(exampleControllerFunc);
         
module.exports = apiRouter;