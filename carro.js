var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var UPA1 = new Gpio(17, 'out'); // MOTOR1A
var UPA2 = new Gpio(22, 'out'); //MOTOR1B
var UPB1 = new Gpio(23, 'out');//MOTOR2A
var UPB2 = new Gpio(24, 'out');//MOTOR2B
//var EUP =  new Gpio(27, 'out');
//motorA1 = 0;
//motorA2 = 0;

//rESET MOTOR
//UPA1.digitalWrite(0);
//UPA2.digitalWrite(0);

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}
io.sockets.on('connection', function (socket) 
{// WebSocket Connection
  console.log("Hola");

  socket.on('avanza', function(data)
  {//activo el soket con el evento avanza que tiene en la funcion el dato del cliente
  console.log("Servidor Conectado");
  Motorvalue = data ; //lo asigno a una variable
  console.log(Motorvalue);
//if(Motorvalue == 1)
    //{ //hago el primer case de prueba de avanza si es la solicitud 001 que pongo en la igualdad?
UPA1.writeSync(1);// manda señal al gpio de upa1
UPA2.writeSync(0);//manda señal al gpio de upa2
UPB1.writeSync(1);// manda señal al gpio de upb1
UPB2.writeSync(0);//manda señal al gpio de upb2
//EUP.writeSync(1);

    //}
  });

  socket.on('atras', function(data)
  {//activo el soket con el evento avanza que tiene en la funcion el dato del cliente
  Motorvalue = data ; //lo asigno a una variable
  console.log(Motorvalue);
//if(Motorvalue == 2)
        //{ //hago el primer case de prueba de avanza si es la solicitud 001 que pongo en la igualdad?
UPA1.writeSync(0);// manda señal al gpio de upa1
UPA2.writeSync(1);//manda señal al gpio de upa2
UPB1.writeSync(0);// manda señal al gpio de upb1
UPB2.writeSync(1);//manda señal al gpio de upb2

//EUP.writeSync(1);
        //}
  });
    socket.on('izquierda', function(data)
    {//activo el soket con el evento avanza que tiene en la funcion el dato del cliente
  Motorvalue = data ; //lo asigno a una variable
  console.log(Motorvalue);
//if(Motorvalue == 3){ //hago el primer case de prueba de avanza si es la solicitud 001 que pongo en la igualdad?
UPA1.writeSync(0);// manda señal al gpio de upa1
UPA2.writeSync(0);//manda señal al gpio de upa1
UPB1.writeSync(1);// manda señal al gpio de upb1
UPB2.writeSync(0);//manda señal al gpio de upb2

         //}
    });
    socket.on('derecha', function(data)
    {//activo el soket con el evento avanza que tiene en la funcion el dato del cliente
  Motorvalue = data ; //lo asigno a una variable
  console.log(Motorvalue);
//if(Motorvalue == 4){ //hago el primer case de prueba de avanza si es la solicitud 001 que pongo en la igualdad?
UPA1.writeSync(1);// manda señal al gpio de upa1
UPA2.writeSync(0);//manda señal al gpio de upa1
UPB1.writeSync(0);// manda señal al gpio de upb1
UPB2.writeSync(0);//manda señal al gpio de upb2

         //}
    });
    socket.on('para', function(data)
    {//activo el soket con el evento avanza que tiene en la funcion el dato del cliente
  Motorvalue = data ; //lo asigno a una variable
  console.log(Motorvalue);
//if(Motorvalue == 5){ //hago el primer case de prueba de avanza si es la solicitud 001 que pongo en la igualdad?
UPA1.writeSync(0);// manda señal al gpio de upa1
UPA2.writeSync(0);//manda señal al gpio de upa1
UPB1.writeSync(0);// manda señal al gpio de upb1
UPB2.writeSync(0);//manda señal al gpio de upb2

          //}
   });
  
    }); 

 
process.on('SIGINT', function () { //on ctrl+c
  UPA1.writeSync(0); // Turn motor off
  UPA1.unexport(); // Unexport motor GPIO to free resources
  UPA2.writeSync(0); // Turn motor off
  UPA2.unexport(); // Unexport motor GPIO to free resources
  
  UPB1.writeSync(0); // Turn motor off
  UPB1.unexport(); // Unexport motor GPIO to free resources
  UPB2.writeSync(0); // Turn motor off
  UPB2.unexport(); // Unexport motor GPIO to free resources

  
  process.exit(); //exit completely
});
