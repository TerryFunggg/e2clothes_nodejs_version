require('dotenv').config()
const path = require('path');
const port = process.env.PORT || 8080
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const routes = require('./server/routes')
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const reload = require('reload')

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'pug')
app.use(routes);

app.listen(port, (error) => {
  if(error) console.log(`Error: ${error}`);
  console.log(`Listening on port ${port}`);
})


reload(app)
