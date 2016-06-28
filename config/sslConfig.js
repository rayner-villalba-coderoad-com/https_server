var path = require('path');
var fs   = require('fs');

module.exports = {
  caPath: path.join(__dirname, '../scripts', 'certs', 'server', 'my-root-ca.crt.pem'),
  keyPath: path.join(__dirname, '../scripts', 'certs', 'server', 'my-server.key.pem'),
  certPath: path.join(__dirname, '../scripts', 'certs', 'server', 'my-server.crt.pem')
};
