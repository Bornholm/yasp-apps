/* jshint esnext: true, node: true */
'use strict';

let level = require('level-party');
let sublevel = require('level-sublevel');
let ReverseProxy = require('redbird');
let uuid = require('node-uuid');

class ProxyService {

  constructor(proxyConfig, storeConfig) {
    this._proxyConfig = proxyConfig;
    this._storeConfig = storeConfig;
    this._store = sublevel(level(storeConfig.dbPath, storeConfig.options));
  }

  startProxy() {
    this._proxy = new ReverseProxy(this._proxyConfig);
  }

  stopProxy() {
    if(this._proxy) this._proxy.close();
  }

  loadExistingRecords() {
    return new Promise((resolve, reject) => {
      this._getRecordsStream()
        .on('data', item => {
          let record = item.value;
          this._registerRecord(record.from, record.to, record.opts);
        })
        .once('error', reject)
        .once('end', () => resolve())
      ;
    });
  }

  getAllRecords() {
    return new Promise((resolve, reject) => {
      let records = [];
      this._getRecordsStream()
        .on('data', item => records.push({key: item.key, record: item.value}))
        .once('error', reject)
        .once('end', () => resolve(records))
      ;
    });
  }

  addRecord(from, to, opts) {
    return new Promise((resolve, reject) => {

      // Try to register new record
      try {
        this._registerRecord(from, to, opts);
      } catch(err) {
        return reject(err);
      }

      // Save it to store
      let recordsStore = this._store.sublevel('records');
      let key = uuid.v4();
      let record = { from, to, opts };

      recordsStore.put(key, record, (err) => {
        if(err) return reject(err);
        return resolve({key, record});
      });

    });

  }

  removeRecord(key) {
    return new Promise((resolve, reject) => {

      // Get records store ref
      let recordsStore = this._store.sublevel('records');

      // Load record from store
      recordsStore.get(key, (err, record) => {

        if(err) return reject(err);

        // Remove record from store
        recordsStore.del(key, err => {

          if(err) return reject(err);

          // Finally unregister the record
          try {
            this._unregisterRecord(record.from, record.to);
          } catch(err) {
            return reject(err);
          }

          return resolve({key, record});

        });

      });

    });

  }

  _registerRecord(from, to, opts) {
    let proxy = this._proxy;
    if(!proxy) throw new Error('The proxy is not instancied yet !');
    proxy.register(from, to, opts);
  }

  _unregisterRecord(from, to) {
    let proxy = this._proxy;
    if(!proxy) throw new Error('The proxy is not instancied yet !');
    proxy.unregister(from, to);
  }

  _getRecordsStream() {
    let recordsStore = this._store.sublevel('records');
    return recordsStore.createReadStream();
  }

}

module.exports = ProxyService;
