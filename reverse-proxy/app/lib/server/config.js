/* jshint esnext: true, node: true */
var path = require('path');

module.exports = require('rc')('yasp-reverseproxy', {

  web: {

    host: 'localhost',
    port: 8888,
    // Or
    socketPath: null,

    clientBaseDir: path.join(__dirname, '../client'),

    log: {
      format: 'combined',
      options: {}
    }

  },

  proxy: {

    // HTTP port
    port: 8080,

    // HTTPS port
    ssl: {
      port: 8443,
      key: path.join(__dirname, '../../.cert/dev-key.pem'),
      cert: path.join(__dirname, '../../.cert/dev-cert.pem')
    }

  },

  store: {
    dbPath: path.join(__dirname, '../../data'),
    options: {
      createIfMissing: true,
      encoding: 'json'
    }
  }

});
