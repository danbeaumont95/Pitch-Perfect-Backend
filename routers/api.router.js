
const apiRouter = require('express').Router();
const { exampleControllerFunc } =require("../controllers/example.controller")
const usersRouter = require('../routers/users.router')
//const router_name = require('router_path')
    
//apiRouter.use('/endpoint', router_name);
apiRouter.route('/')
         .get(exampleControllerFunc);

apiRouter.use('/users', usersRouter)
        
         
module.exports = apiRouter;