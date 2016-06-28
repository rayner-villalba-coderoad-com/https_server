var fs        = require('fs');
var https     = require('https');
var http      = require('http');
var utils     = require('./utils.js');
var sslConfig = require('../config/sslConfig.js');


function addCertifies() {
  var existsKeys = utils.checkFileExists(sslConfig.keyPath);
  var existsCertificate = utils.checkFileExists(sslConfig.certPath);
  var httpsCertificate = {};

  if (existsKeys && existsCertificate) {    
    httpsCertificate = {
      key: fs.readFileSync(sslConfig.keyPath),
      //ca: fs.readFileSync(sslConfig.caPath),
      cert: fs.readFileSync(sslConfig.certPath),
      requestCert: true, // require client send certificate
      rejectUnauthorized: true 
    };
  }
  return httpsCertificate;
}

function startServer(app, options) {  
  //Check if it has https certifies then create https server
  if (Object.getOwnPropertyNames(options).length > 0) {
    console.log('Starting HTTPS Server...');
    return https.createServer(options, app);
  }

  console.log("Starting HTTP Server ...");
  return http.createServer(app);
}

module.exports = {
  createServer: function(settings, app, callback) {
    var options = addCertifies();
    return startServer(app, options).listen(settings.port, callback);
  }
};