/* jshint esnext: true, node: true */
'use strict';

let config = require('../lib/server/config');
let ProxyService = require('../lib/server/services/proxy');
let path = require('path');
let rimraf = require('rimraf');

let testDataDir = path.join(__dirname, '.data-session-'+process.pid);

exports.setUp = function(done) {

  // Overwrite config for tests
  config.proxy.bunyan = false;
  config.store.dbPath = testDataDir;

  this.proxy = new ProxyService(config.proxy, config.store);
  this.proxy.startProxy();

  done();

};

exports.tearDown = function(done) {
  this.proxy.stopProxy();
  rimraf.sync(testDataDir);
  done();
};

exports.addRecordThenRemove = function(test) {

  this.proxy.addRecord('localhost:80', 'http://google.com/')
    .then(result => {
      test.ok(result.key, 'result should have a key');
      return this.proxy.getAllRecords()
        .then(records => {
          test.ok(records.length === 1, 'Their should be not records left.');
          return this.proxy.removeRecord(result.key);
        })
      ;
    })
    .then(result => {
      test.ok(result.key, 'result should have a key');
      return this.proxy.getAllRecords();
    })
    .then(records => {
      test.ok(records.length === 0, 'Their should be not records left.');
    })
    .then(test.done)
    .catch(err => {
      test.ifError(err);
      test.done();
    })
  ;
};
