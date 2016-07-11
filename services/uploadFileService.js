var fs     = require('fs');
var path   = require('path');
var utils  = require('./utils.js');

function uploadFile(app, settings) { 
  
  utils.checkDirectorySync(settings.uploadBaseFolder);
  //Set the base directory
  var uploadFolder = settings.uploadBaseFolder;
  
  //Create a temp folder if does not exist
  utils.checkDirectorySync('./temp');
  
  //Check if it is send the file name in the header 
  app.use(function(req, res, next) {console.log(req.method);
    //TODO Ask David Foster if we can modify the script meanwhile we check header and look for filename 
    var fileName = req.headers.filename;
    //Check if file name is sent 
    if(!fileName && req.method === 'POST') {
      res.status(500);
      res.end("Please add file name in the header \n");
    } else {
      return next();
    }
  });

  app.post('/:ediPath', function(req, res) {

    var ediFolder = path.join(uploadFolder, req.params['ediPath']);


    //Check if the folder exists if it doesn't the folder will be created
    utils.checkDirectorySync(ediFolder);

    var destFolderTemp = './temp';
    var destFolder = ediFolder;
    var tempPath = destFolderTemp;
    //TODO remove this line
    //console.log(req.headers);

  	
    //TODO Ask David Foster if we can modify the script meanwhile we check header and look for filename 
    var fileName = req.headers['filename'];
    
    destFolder = path.join(destFolder, fileName);
    destFolderTemp = path.join(destFolderTemp, fileName);
    
    //var existsFile = utils.checkFileExists(destFolder);

    //TODO ask David how to handle files that were updated or it has same file name 
    //meanwhile check it won't be possible to upload the same file 
    //if(!existsFile) {
      var destinationFile = fs.createWriteStream(destFolderTemp); 
      
      destinationFile.on('error', function(err) {
        console.log('This is an error');
      });
      
      req.pipe(destinationFile,{end: false});
      
      var fileSize = req.headers['content-length'];
      var uploadedBytes = 0 ;
      var tempPorcentage = 0;

      req.on('data',function(data) {                    
        uploadedBytes += data.length;
        var p = parseInt((uploadedBytes / fileSize) * 100);
        
        if(p !== tempPorcentage) {
          res.write("Uploading " + p+ " %\n");
        }
        tempPorcentage = p;
      });

      req.on('end',function() {
        moveFile(destFolderTemp, destFolder);
        destFolderTemp = tempPath;
        
        res.status(204);
        res.end("File Upload Complete \n");

      });
      
      req.on('error', function(){
        destFolderTemp = tempPath;
        res.status(500);
        res.end("Error \n");
        console.log('Error occurs!! (~_~) /');
      });

      req.on('timeout', function() {
        req.pause();
        res.status(400);
        res.end('Something Went Wrong');
      });

      req.on("close", function(err) {
        console.log("request closed...");
      });
    //} else {
    //  destFolder = tempPath;
    //  res.status(500);
    //  res.end("You can not upload this File, because this file has been uploaded \n");
    //}
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

module.exports.upload = uploadFile;