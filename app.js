var app             = require('express')();
var express         = require('express');
var httpsService    = require('./services/httpService.js');
var settings        = require('./config/config.json');
var uploadService   = require('./services/uploadFileService.js');
var downloadService = require('./services/downloadFileService.js');


var callback = function () {
  console.log('Listen port: ' + settings.port);
};

app.get('/', function(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.write('Express App');
    res.send('hello world');

});
// Redirect all http traffic to https
app.use(function(req,res,next) { 
   if (!/https/.test(req.protocol)){
        res.redirect("https://" + req.headers.host + req.url);
    } else {
        // If we're on https, ensure all requests will be over https
        // http://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
        res.setHeader("Strict-Transport-Security", "max-age=31536000");
        return next();
    }
});


httpsService.createServer(settings, app, callback);
uploadService.upload(app, settings);
downloadService.download(app, settings);