/* jshint esnext: true, node: true */
'use strict';

let uuid = require('node-uuid');
let handlebars = require('handlebars');
let fs = require('fs');
let path = require('path');
let pegjs = require('pegjs');
let exec = require('child_process').exec;
let debug = require('debug')('yasp-reverseproxy:services:nginx');

const FILE_PREFIX = 'yasp-';
const NGINX_FILE_PATTERN = /^yasp-([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/i;

class NginxService {

  constructor(nginxConfig) {

    this._nginxConfig = nginxConfig;

    // Instanciate Nginx configuration parser
    let parserSyntax = fs.readFileSync(nginxConfig.parserSyntax, 'utf8');
    this._parser = pegjs.buildParser(parserSyntax);

    // Load templates
    this._templates = {
      [NginxService.REVERSE_PROXY]: this._loadAndCompileTemplate(nginxConfig.templates.reverseProxy)
    };

  }

  getEntries() {
    return this._getYaspConfigFiles()
      .then(files => {
        let promises = files.map(f => {
          let id = f.match(NGINX_FILE_PATTERN)[1];
          return this._loadConfigFile(f)
            .then(res => {
              res.id = id;
              return res;
            })
          ;
        });
        return Promise.all(promises);
      })
    ;
  }

  deleteEntry(entryId) {
    return new Promise((resolve, reject) => {
      let filePath = this._getEntryPath(entryId);
      fs.unlink(filePath, function(err) {
        if(err) return reject(err);
        return resolve();
      });
    });
  }

  saveTemplate(templateName, data, entryId) {
    return new Promise((resolve, reject) => {
      if( !(templateName in this._templates) ) {
        return reject(new Error(`The template "${templateName}" does not exist !`));
      }
      let template = this._templates[templateName];
      let fileContent = template(data);
      return this.saveRawConfig(fileContent, entryId)
        .then(resolve)
        .catch(reject)
      ;
    });
  }

  saveRawConfig(rawConfig, entryId) {
    return new Promise((resolve, reject) => {
      if(!entryId) entryId = uuid.v4();
      let filePath = this._getEntryPath(entryId);
      fs.writeFile(filePath, rawConfig, (err) => {
        if(err) return reject(err);
        return resolve(entryId);
      });
    });
  }

  reload() {
    return new Promise((resolve, reject) => {
      exec(this._nginxConfig.reloadCommand, err => {
        if(err) return reject(err);
        return resolve();
      });
    });
  }

  _getEntryPath(entryId) { 
    let sitesEnabledDir = this._nginxConfig.sitesEnabledDir;
    let filePath = path.join(sitesEnabledDir, FILE_PREFIX+entryId);
    return filePath;
  }

  _loadAndCompileTemplate(path) {
    let templateContent = fs.readFileSync(path, 'utf8');
    return handlebars.compile(templateContent);
  }

  _getYaspConfigFiles() {
    return new Promise((resolve, reject) => {
      let sitesEnabledDir = this._nginxConfig.sitesEnabledDir;
      fs.readdir(sitesEnabledDir, (err, files) => {
        if(err) return reject(err);
        return resolve(files.filter(f => NGINX_FILE_PATTERN.test(f)));
      });
    });
  }

  _loadConfigFile(filename) {
    return new Promise((resolve, reject) => {
      let sitesEnabledDir = this._nginxConfig.sitesEnabledDir;
      let filePath = path.join(sitesEnabledDir, filename);
      fs.readFile(filePath, 'utf8', (err, raw) => {
        if(err) return reject(err);
        let ast = null;
        try {
          ast = this._parser.parse(raw);
        } catch(err) {
          debug(`Could\'nt parse file ${filePath} ! Error: %s`, err);
        }
        return resolve({ast, raw});
      });
    });
  }

}

NginxService.REVERSE_PROXY = 'reverse-proxy';

module.exports = NginxService;
