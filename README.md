# ROCKET HTTPS SERVER

### Requirements 

 * NodeJs 4
 * Openssl (optional)

### Setting up the Project 

Let's clone and setting up the project 

```bash
  git clone git@github.com:rayner-villalba-coderoad-com/https_server.git
  cd https_server
  npm init 
```  
### Add HTTPS certifications
In order to add https certifications you have to edit **sslConfig.js**  that is inside of _config_ folder. This file should look like this: 
```javascript
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
```
You must add your https certifications files. Let's check an example:

```javascript
var path = require('path');
var fs   = require('fs');

/**
 caPath: must contain the path of certificate authority or certification authority (CA) file
 keyPath: must contain the path of https key file certification
 certPath: must contain the path of https certification file certification 
*/
module.exports = {
  caPath: 'C://https_server/my-root-ca.crt.pem', 
  keyPath: 'C://https_server/my-server.key.pem',
  certPath: 'C://https_server/my-server.crt.pem'
};
```

### Change the Port and Trash Folder (optional)   
If you want to change some default configurations of the project, you can edit **config.json** that appears inside of _config_ folder. It can look like this:

```javascript
 {
  "port": 8080,
  "uploadBaseFolder":"./upload",
  "trashFolder": "./remove"
}
```
You can change change the port, uploadBaseFolder and trashFolder:

```javascript
 {
  "port": 6666,
  "uploadBaseFolder":"C:/EDI_FILES",
  "trashFolder": "C:/old_files"
}
```
 
**NOTE** 
  * port: contains the port that node application will run
  * uploadBaseFolder: contains the base directory where the files will be uploaded
  * trashFolder: contains the directory where the file will be moved after downloading it

### Start the Project
Let's run the following command:

```bash
  node app.js
``` 

### Test with Curl 
You can test upload and download with the following command lines: 

**Upload a File**

```bash
  curl http://localhost:8080/upload --data-binary @example.txt -H "filename:example.txt"
```

**Download a File**

```bash
  curl -O "http://localhost:8080/upload/example.txt"
```
