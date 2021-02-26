
const express = require('express');
const apiRouter = require('./routers/api.router.js')

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
    next({status: 404, msg: 'route not found'})
});


app.use((err, req, res, next) => {
    // handle custom error
});
app.use((err, req, res, next) => {
    // handle sql/database error
});
app.use((err, req, res, next) => {
    // handle server error
});

module.exports = app;
