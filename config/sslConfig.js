var path = require('path');
var fs   = require('fs');

/**
 caPath: must contain the path of certificate authority or certification authority (CA) file
 keyPath: must contain the path of https key file certification
 certPath: must contain the path of https certification file certification 
*/
module.exports = {
  caPath: path.join(__dirname, '../scripts', 'certs', 'server', 'my-root-ca.crt.pem'),
  keyPath: path.join(__dirname, '../scripts', 'certs', 'server', 'my-server.key.pem'),
  certPath: path.join(__dirname, '../scripts', 'certs', 'server', 'my-server.crt.pem')
};
