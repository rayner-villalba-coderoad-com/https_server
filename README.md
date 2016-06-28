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
  certPath: C://https_server/my-server.crt.pem'
};
```

### Change the Port and Trash Folder (optional)   
If you want to change some default configurations of the project, you can edit **config.json** that appears inside of _config_ folder. It can look like this:

```javascript
 {
  "port": 8080,
  "trashFolder": "./remove"
}
```
You can change change the port and trashFolder:  

```javascript
 {
  "port": 6666,
  "trashFolder": "C://old_files"
}
```
 
**NOTE** 
  * port: contains the port that node application will run
  * trashFolder: contains the directory will contain the files that were downloaded

### Start the Project
Let's run the following command:

```bash
  node app.js
``` 