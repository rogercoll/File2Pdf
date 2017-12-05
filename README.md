# File2Pdf

This Nodejs package creats a server which you can upload any kind of file (that can be transformed to pdf) and it converts them to PDF format. 

### Prerequisits 

The server which runs the package must be a Linux destribution(better if it's Debian) because when it converts the files it uses a program called **Abiword** that can be used from the command line.

In the server must be installed:

- Abiword:
```
    sudo apt-get install abiword
```

- Nodejs/Npm (this installation is for Debian and Ubuntu)
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

```


### Usage

```
git clone https://github.com/rogercoll/File2Pdf.git
cd  /path/to/File2pdf 
node server.js
```

### File interaction

All files that the client will upload will be stored in the folder /uploads from the package folder. When the conversion it's done the result files are also stored there. You can easily change the directory in:

- Server.js

```javascript
app.post('/convert', function(req,res){

  var data = req.body;
  var com = "abiword --to=pdf ";
  var files = '"files" : ';
  var os;
  for(var i = 0; i < data.fitxers.length; ++i){
    var fname = data.fitxers[i].Namefile;
    var auxiliar = com + "uploads/" + fname; //add here the directory which you want to save the file(s)
```

Went files are converted client will automaticaly download the final files. 

##### Little issue

For the moment the uploaded files can not have any dot(.) in the name file. Only the dot that the word after determines the file type. 
