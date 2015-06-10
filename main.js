var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)  
  , fs = require('fs');  

var inputPort = 1337; // to avoid js error at init              
var folder_path = "/data" ;
var consoleUpdateInMilliSeconds   = 1000;
var fileWriteUpdateInMilliSeconds = 10000;
var myVar1=setInterval(function(){myTimer()},consoleUpdateInMilliSeconds); // show current time
var myVar4=setInterval(function(){myClient()},consoleUpdateInMilliSeconds); // update console
// var myVar2=setInterval(function(){updateConsoleWithIncomingDataAndWriteToFile()},fileWriteUpdateInMilliSeconds); // write file and update console
// var numberOfConnertion=0;
var data = 0; // problem 
var bTimer = false;
var numberOfConnertion=0;

function button1()
{    
    // get
    inputPort = document.getElementById('myPort').value;
    // debug
    document.getElementById("console").innerHTML= "Server is configured to listen to port " + inputPort;
}

function button2()
{          
    // get  
    folder_path = document.getElementById('myPath').value;
    //stream = fs.createWriteStream(folder_path+"/my_file.txt", {'flags': 'a'});     
    stream = fs.createWriteStream(folder_path, {'flags': 'a'});     
    stream2 = fs.createWriteStream(folder_path.concat('(checkintimetag)'), {'flags': 'a'});     
    // debug
    document.getElementById("console").innerHTML= "Folder path = " + folder_path;
}

function button3()
{            
  //     
  server.listen(inputPort);
  // debug
  document.getElementById("console").innerHTML= "Server starts listening to port " + inputPort;

  bTimer = true;
}

function button4()
{        
    // io.sockets.on('disconnection', function (socket) {  
    //   socket.on('disconnect', function () {
    //       // io.sockets.emit('user disconnected');
           // server.close();    
           // socket.disconnect();
    //       //socket.destroy();
    //     });
    // };
    //io.server.close();

    // var socketlist = [];
    // io.sockets.on('connection', function(socket) {
    //     socketlist.push(socket);
    //     socket.emit('socket_is_connected','You are connected!');
    //     socket.on('close', function () {
    //       console.log('socket closed');
    //       socketlist.splice(socketlist.indexOf(socket), 1);
    //     });
    // });

    // socketlist.forEach(function(socket) {
    //   socket.destroy();
    // });
    // io.socket.disconnect();
    // io.server.close();    
      //io.sockets.on('connection', function (socket) {
        //sockets.destroy();
        //io.sockets.disconnect(true);
        server.close();
        //app.close();
     // });
    // debug
    document.getElementById("console").innerHTML= "Server stopped successfully!";    

    bTimer = false;  
}

function button5()
{     

    // bTimer = false;   
    //
    stream.end();
    stream2.end();
    //
    document.getElementById("console").innerHTML= "File saved!";
}

function button6()
{     
    window.close();  
}

function myClient(){
  if (bTimer) {
        server.getConnections(function(err, count) {          
           //console.log("Connections: " + count + "Connections debug:" + numberOfConnertion);
           document.getElementById("numberOfClients").innerHTML= count + ";" + numberOfConnertion;    
        });    
      }
}

function myTimer()
{
    var d=new Date();
    var t=d.toLocaleTimeString();
    document.getElementById("currentTime").innerHTML= t;
}    

// function updateConsoleWithIncomingDataAndWriteToFile(){      
//   io.sockets.on('connection', function (socket) {
//       socket.on('sliderValue', function (data) {    
//         if (bTimer) {
//         //
//         document.getElementById("console").innerHTML= "Incoming data: " + String(data[0]) + " - " + String(data[1]) + " - " + String(data[2]) + " - " + String(data[3]) + " - " + String(data[4]) + " - " + String(data[5]) + " - " + String(data[6]);            
//         //
        
//         //console.log("/user " + " - " + String(data[0]) + " - " + String(data[1]) + " - " + String(data[2]) + " - " + String(data[3]) + " - " + String(data[4]) + " - " + String(data[5]) + " - " + String(data[6]));        

//         stream.write(String(data[0]) + " , " + String(data[1]) + " , " + String(data[2]) + " , " + String(data[3]) + " , " + String(data[4]) + " , " + String(data[5]) + " - " + String(data[6]) + "\n");    
//         };
//       });  
//   });
// }

io.sockets.on('connection', function (socket) {
  numberOfConnertion++;
  var currentdate = new Date(); 
  var datetime = ":" + currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  stream2.write("Client number "+numberOfConnertion+" checked in at "+datetime + "\n");    

  socket.on('sliderValue', function (data) {            
  if (bTimer) {
    document.getElementById("console").innerHTML= "Incoming data: " + String(data[0]) + " - " + String(data[1]) + " - " + String(data[2]) + " - " + String(data[3]) + " - " + String(data[4]) + " - " + String(data[5]) + " - " + String(data[6]);
    stream.write(String(data[0]) + " , " + String(data[1]) + " , " + String(data[2]) + " , " + String(data[3]) + " , " + String(data[4]) + " , " + String(data[5]) + " - " + String(data[6]) + "\n");    
  };
  });  
});
