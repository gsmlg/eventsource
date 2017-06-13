const express = require('express');
const app = express()
const setup = require('./middlewares/frontendMiddleware');

setup(app, {});
// app.use(express.static(__dirname + '/public'));

app.listen(8090);

app.get('/*', (req, res, next) => {
    console.log(req.path_info);
})

