'use strict';

var app = require('express')();

require('jsreport').bootstrapper({
  express: {
    app: app
  }
}).start().then(function() {
  console.log('Servidor de reportes inicializado..');

  app.listen(4500);
});
