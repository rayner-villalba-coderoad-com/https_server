var fs    = require('fs');
var path  = require('path');
var utils = require('./utils.js');

function download(app, settings) {
  app.get('/:ediPath/:file', function(req, res) {

  	var fileName   = req.params['file'];

    //Set base upload directory
    var uploadDir  = settings.uploadBaseFolder;
    var sourcePath = path.join(uploadDir, req.params['ediPath'], fileName);

    //Check if the folder exists if it doesn't the folder will be created
    utils.checkDirectorySync(settings.trashFolder);

    var destPath   = path.join(settings.trashFolder, fileName);

    var downloadCallback = function(err) {
      if(err) {
        console.log(err);
        res.status(500);
        res.end("Error: " + err + "\n");	
      } else { 
        //Move the downloaded file to another folder
        moveFile(sourcePath, destPath);
        res.status(204);
        res.end("File Download Complete \n");
      }  
    };


    //Check if field exists if it is then download field
    if(utils.checkFileExists(sourcePath)) {
      //Download the file given source path, file Name and callback 
      res.download(sourcePath, fileName, downloadCallback);
    } else {
      console.log("File does not exist");
      res.status(500);
      res.end("File does not exist \n");
    }
    
  });
}

/*
 * moveFile() moves a file from one directory to another 
 * given source path and destination path 
 * @param {String} sourceFilePath
 * @param {String} destFilePath 
 */
function moveFile(sourceFilePath, destFilePath) {
  var source = fs.createReadStream(sourceFilePath);
  var dest   = fs.createWriteStream(destFilePath);

  source.pipe(dest);

  source.on('end',function() {
    fs.unlink(sourceFilePath, function(err) {
      if(err) throw err;

      console.log('Your file has been moved');
    });
  });
  source.on('error', function(err) {
    console.log(err);
  });
}

module.exports.download = download;