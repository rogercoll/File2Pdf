var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('child_process').exec;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/download/:uid', function(req, res){
  console.log(req.params.uid);
  var aux = "uploads/" + req.params.uid;
  var file = (path.join(__dirname, aux));
  res.download(file);
});


app.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/uploads');
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', function() {
    res.end('success');
  });
  form.parse(req);

});

var isPaused = true;

function os_func(){
    isPaused = false;
    this.execCommand = function(cmd,callback){
    exec(cmd, (error,stdout,stderr) => {
      if(error){
        console.log(error);
        return;
      }
      else{
        isPaused = true;
        callback(stdout);
      }
    });
  }
}


app.post('/convert', function(req,res){

  var data = req.body;
  var com = "abiword --to=pdf ";
  var files = '"files" : ';
  var os;
  for(var i = 0; i < data.fitxers.length; ++i){
    var fname = data.fitxers[i].Namefile;
    var auxiliar = com + "uploads/" + fname;
    var substr = fname.substr(0, fname.indexOf('.'));
    files += '"' + substr + '"';
    if(i < data.fitxers.length -1) files += " , ";
    os = new os_func();
    os.execCommand(auxiliar,function(ret){
      console.log("finished");
    })
	  console.log(fname);
  }
  function wait4it(){
    if(isPaused == true){
      var txt = '{"msg":"redirect" , "location":"/download" , ' + files + "}" ;
      console.log(txt);
      res.end(txt);
    }
    else{
      setTimeout(function(){wait4it()},100);
    }
  }
  wait4it();
});



app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
