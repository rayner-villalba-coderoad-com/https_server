var fs     = require('fs');
var path   = require('path');
var multer = require('multer');
var utils  = require('./utils.js');
/*
 * checkDirectorySync()  check if the current directory exists
 * if it  does not, it will create a folder   
 * @param {String} directory
 */
function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

function uploadFile(app, settings) { 
  
  //utils.checkDirectorySync(settings.folders.uploadFolder);	
  //var destFolder = settings.folders.uploadFolder;
  
  //Create a temp folder if does not exist
  utils.checkDirectorySync('./temp');
  
  //Check if it is send the file name in the header 
  app.use(function(req, res, next) {
    //TODO Ask David Foster if we can modify the script meanwhile we check header and look for filename 
    var fileName = req.headers.filename;
    //Check if file name is sent 
    if(!fileName) {
      res.status(500);
      res.end("Please add file name in the header \n");
    } else {
      return next();
    }
  });

  app.post('/:ediPath', function(req, res) {
    //Check if the folder exists if it doesn't the folder will be created
    utils.checkDirectorySync(req.params['ediPath']);  
    
    //var destFolder = req.params['ediPath'];
    var destFolderTemp = './temp';
    var destFolder = req.params['ediPath'];
    var tempPath = destFolderTemp;
    //TODO remove this line 
    console.log(req.headers);
    //console.log(req.files);
  	
    //TODO Ask David Foster if we can modify the script meanwhile we check header and look for filename 
    var fileName = req.headers['filename'];
    
    destFolder = path.join(destFolder, fileName);
    destFolderTemp = path.join(destFolderTemp, fileName);
    
    var existsFile = utils.checkFileExists(destFolder);
    
    var removeFile = function (filePath) {
      try {
        fs.unlink(filePath);
        console.log('File"' + filePath + '" removed!');     
      } catch (err) {
        console.log('error');
      }
    };
    //TODO ask David how to handle files that were updated or it has same file name 
    //meanwhile check it won't be possible to upload the same file 
    if(!existsFile) {
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
    } else {
      destFolder = tempPath;
      res.status(500);
      res.end("You can not upload this File, because this file has been uploaded \n");
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

module.exports.upload = uploadFile;