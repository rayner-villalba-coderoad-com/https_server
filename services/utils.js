var fs = require('fs');


module.exports = {
 /*
  * checkDirectorySync()  check if the current directory exists
  * if it  does not, it will create a folder   
  * @param {String} directory
  */	
  checkDirectorySync: function (directory) {  
	//Check if the directory does not exist
    if(!this.checkFileExists(directory)) {
  	  fs.mkdirSync(directory);
    }
  },

  /*
   * checkFileExists() checks if a file or folder exists  
   * based on the file path
   * @param {String} sourceFilePath
   * @return {Boolean} 
   */
  checkFileExists: function (filePath) {
  	if(!filePath) return false;
	try {
	  return fs.realpathSync(filePath);
	} catch(e){
	  return false;
	}
  },
  /*
  * moveFile() moves a file from one directory to another 
  * given source path and destination path 
  * @param {String} sourceFilePath
  * @param {String} destFilePath 
  */
  moveFile: function (sourceFilePath, destFilePath, successFileCallback, failureFileCallback) {
    var dest;
    var source = fs.createReadStream(sourceFilePath);
    
    //Check if the destination folder exists
    if(this.checkFileExists(destFilePath)){
      dest = fs.createWriteStream(destFilePath);	
      source.pipe(dest);
      source.on('end', successFileCallback);
      source.on('error', failureFileCallback);
    } else {
      //console.log('Your folder does not exits');
      failureFileCallback();
    }

     
  }
};