var files = [];
var aux = [];

$(document).bind('dragover', function (e) {
    var dropZone = $('.zone'),
        timeout = window.dropZoneTimeout;
    if (!timeout) {
        dropZone.addClass('in');
    } else {
        clearTimeout(timeout);
    }
    var found = false,
        node = e.target;
    do {
        if (node === dropZone[0]) {
            found = true;
            break;
        }
        node = node.parentNode;
    } while (node != null);
    if (found) {
        dropZone.addClass('hover');
    } else {
        dropZone.removeClass('hover');
    }
    window.dropZoneTimeout = setTimeout(function () {
        window.dropZoneTimeout = null;
        dropZone.removeClass('in hover');
    }, 100);
});


$(".zone").bind('dragover drop', function(event) {
    // Stop default actions - if you don't it will open the files in the browser
    event.preventDefault();

    if (event.type == 'drop') {
      event.dataTransfer = event.originalEvent.dataTransfer;
      files.push(event.dataTransfer.files);

      drop();
    }
});


$('#upload-input').on('change', normal_drop);

function drop(e){
    console.log("hi");
    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(file);

        // add the files to formData object for the data payload
        formData.append('uploads[]', file[0], file[0].name);
        aux.push(file[0].name);
        files = [];
      }

      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful!\n' + data);
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          $('#dropZ').hide();
          $( "<p id= 'tantpercent' style='font-size:40px;  color:white;   text-align:center; vertical-align: middle;   display: table-cell;'>0 %</p>" ).appendTo( ".zone" );
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $('#tantpercent').html(percentComplete + "%");
              // update the Bootstrap progress bar with the new percentage
              //$('.progress-bar').text(percentComplete + '%');
              //$('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                //$('.progress-bar').html('Done');
                //$('#dropZ').show(1500);
                $('#tantpercent').html('<i class="fa fa-file-text-o" style="font-size:42px;"></i> File(s) uploaded <button class="button button1" onclick="convertion()">CONVERT</button>');
              }

            }

          }, false);

          return xhr;
        }
      });

    }
}

function normal_drop(e){
    console.log("hi");
    var files = $(this).get(0).files;

    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(file);

        // add the files to formData object for the data payload
        formData.append('uploads[]', file, file.name);
        aux.push(file.name);
      }

      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful!\n' + data);
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          $('#dropZ').hide();
          $( "<p id= 'tantpercent' style='font-size:40px;  color:white;   text-align:center; vertical-align: middle;   display: table-cell;'>0 %</p>" ).appendTo( ".zone" );
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $('#tantpercent').html(percentComplete + "%");
              // update the Bootstrap progress bar with the new percentage
              //$('.progress-bar').text(percentComplete + '%');
              //$('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                //$('.progress-bar').html('Done');
                //$('#dropZ').show(1500);
                $('#tantpercent').html('<i class="fa fa-file-text-o" style="font-size:42px;"></i> File(s) uploaded <button class="button button1" onclick="convertion()">CONVERT</button>');
              }

            }

          }, false);

          return xhr;
        }
      });

    }
}


function convertion(){
  console.log("hi");
  var fil = {
    fitxers: []
  };
  for(var i in aux){
    fil.fitxers.push({
      "Namefile" : aux[i]
    });
  }
  console.log(JSON.stringify(fil));
  console.log(fil);
  if(aux.length > 0){
    $.ajax({
        url: '/convert',
        type: 'POST',
        data: JSON.stringify(fil),
        processData: false,
        contentType: 'application/json',
        success: function(data){
          console.log("Starting conversion");
        },
        error: function(a,b,c){
          console.log(c);
        }
    });
  }

}
