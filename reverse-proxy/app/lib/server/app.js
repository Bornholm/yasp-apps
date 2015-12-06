/* jshint esnext: true, node: true */
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let compression = require('compression');
let browserifyMiddleware = require('browserify-middleware');
let morgan = require('morgan');

let controllers = require('./controllers');
let services = require('./services');

class App {

  constructor(config) {

    this._config = config;
    this._expressApp = express();

    this._configure();

  }

  start() {

    let socketPath = this._config.web.socketPath;
    let port = this._config.web.port;
    let host = this._config.web.host;

    let app = this._expressApp;

    return new Promise((resolve, reject) => {

      this._startReverseProxy()
        .then(() => {

          if(socketPath) {
            app.listen(socketPath, _listenHandler);
          } else {
            app.listen(port, host, _listenHandler);
          }

          function _listenHandler(err) {
            if(err) return reject(err);
            return resolve();
          }

        })
        .catch(err => {
          this._proxyService.stopProxy();
          return reject(err);
        })
      ;

    });

  }

  _startReverseProxy() {
    let proxy = this._proxyService;
    proxy.startProxy();
    return proxy.loadExistingRecords();
  }

  _configure() {

    let app = this._expressApp;
    let config = this._config;

    // Request logger
    app.use(morgan(config.web.log.format, config.web.log.options));

    // Activate gzip compression
    app.use(compression());

    // Parse JSON requests
    app.use(bodyParser.json());

    // Create proxy service
    this._proxyService = new services.ProxyService(config.proxy, config.store);

    let recordsCtrl = new controllers.RecordsController(this._proxyService);

    app.use('/api/records', recordsCtrl.middleware());

    // Expose client application via browserify
    app.use('/js', browserifyMiddleware(config.web.clientBaseDir + '/js', {
      transform: [['babelify', {presets: ['es2015', 'react']}]],
      settings: {
        production: {
          gzip: false
        }
      }
    }));

    // Expose client files
    app.use(express.static(config.web.clientBaseDir));

    // Expose vendors
    app.use('/vendor', express.static('./node_modules'));

  }

}

module.exports = App;
