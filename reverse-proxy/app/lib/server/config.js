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

  nginx: {

    parserSyntax: path.join(__dirname, 'parser/nginx.pegjs'),

    reloadCommand: 'nginx -s reload',
    sitesEnabledDir: '/etc/nginx/sites-enabled',

    templates: {
      reverseProxy: path.join(__dirname, 'templates/reverse-proxy.tpl')
    }

  }

});
