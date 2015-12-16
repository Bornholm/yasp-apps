/* jshint esnext: true, node: true */
'use strict';

let config = require('../lib/server/config');
let NginxService = require('../lib/server/services/nginx');
let path = require('path');
let fs = require('fs');

exports.setUp = function(done) {

  // Override config
  config.nginx.sitesEnabledDir = path.join(__dirname, 'fixtures/nginx-conf');
  this.nginx = new NginxService(config.nginx);

  done();

};

exports.saveRPTemplateThenLoad = function(test) {

  let conf = {
    'server_name': 'foo.com',
    'proxy_pass': 'http://127.0.0.1:8888'
  };

  this.nginx.saveTemplate(NginxService.REVERSE_PROXY, conf)
    .then(entryId => {
      console.log(entryId);
      return this.nginx.getEntries()
        .then(entries => {
          console.log(JSON.stringify(entries, null, 2));
        })
      ;
    })
    .catch(err => {
      test.ifError(err);
      test.done();
    })
    .then(() => test.done())
  ;
};
