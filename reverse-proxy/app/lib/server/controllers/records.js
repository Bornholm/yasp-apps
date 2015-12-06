/* jshint esnext: true, node: true */
'use strict';

let Controller = require('./controller');

class ProxyController extends Controller {

  constructor(proxyService) {
    super();
    this._proxy = proxyService;
  }

  showRecords(req, res, next) {
    this._proxy.getAllRecords()
      .then(records => res.status(200).send(records))
      .catch(next)
    ;
  }

  createRecord(req, res, next) {

    let record = req.body;

    // TODO validate record payload

    this._proxy.addRecord(record.from, record.to, record.opts)
      .then(result => res.status(201).send(result))
      .catch(next)
    ;
    
  }

  bindTo(app) {
    app.get('/', this.showRecords.bind(this));
    app.post('/', this.createRecord.bind(this));
  }

}

module.exports = ProxyController;
