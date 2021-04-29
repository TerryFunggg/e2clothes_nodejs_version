const path = require('path');
const port = process.env.PORT || 8080
const express = require('express');
const routes = require('./routes')
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));
app.set("view engine", 'ejs')
app.use(routes);

app.listen(port, (error) => {
  if(error) console.log(`Error: ${error}`);
  console.log(`Listening on port ${port}`);
})

