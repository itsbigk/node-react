'use strict';

const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      morgan         = require('morgan'),
      React          = require('React'),
      Router         = require('react-router'),
      RoutingContext = Router.RoutingContext,
      match          = Router.match,
      createlocation = require('history/lib/createlocation'),
      renderToString = require('react-dom/server').renderToString,
      routes         = require('./src/config/routes.jsx'),
      port           = process.env.PORT || 3000,
      api            = require('./app/routes/api'),
      db             = require('./app/db');

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

db(function() {

  app.use('/api', api());

  app.use('/', function(req, res) {
    let location = createlocation(req.url);

    match({routes, location}, function(error, redirectLocation, renderProps) {
      if(redirectLocation) {
        res.redirect(301,redirectLocation.pathname + redirectLocation.search);
      } else if(error) {
        res.send(500, error.message);
      } else if(renderProps == null) {
        res.send(404, 'Not Found');
      } else {
        res.send(renderToString(RoutingContext(renderProps)));
      }

      app.listen(port);

      console.log('Server running on http://localhost:%s', port);
    });
  });
});

module.exports = app;
