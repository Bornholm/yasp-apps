/* jshint esnext: true, node: true */
'use strict';

let Controller = require('./controller');

class ProxyController extends Controller {

  constructor(nginxService) {
    super();
    this._nginx = nginxService;
  }

  showEntries(req, res, next) {
    this._nginx.getEntries()
      .then(entries => res.status(200).send(entries))
      .catch(next)
    ;
  }

  createEntry(req, res, next) {

    // TODO Validate req.body format & data
    // TODO handle templatized creation

    let rawConfig = req.body.rawConfig;

    this._nginx.saveRawConfig(rawConfig)
      .then(result => {
        return this._nginx.reload()
          .then(() => res.status(201).send(result))
        ;
      })
      .catch(next)
    ;

  }

  deleteEntry(req, res, next) {

    let entryId = req.params.entryId;

    // TODO validate record payload

    this._nginx.deleteEntry(entryId)
      .then(result => {
        return this._nginx.reload()
          .then(() => res.status(204).send(result))
        ;
      })
      .catch(next)
    ;

  }

  bindTo(app) {
    app.get('/', this.showEntries.bind(this));
    app.post('/', this.createEntry.bind(this));
    app.delete('/:entryId', this.deleteEntry.bind(this));
  }

}

module.exports = ProxyController;
