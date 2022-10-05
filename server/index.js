'use strict';
//require('..index/driver/index');
//require('../vendor/index');
const {Server} = require('socket.io');
const PORT = 3002;
// assign socket.io as the server on 3002
const server = new Server(PORT);
//namespace
const CAPS = server.of('/CAPS');


// eventPool.on('PACKAGEINTRANSIT', PACKAGEDELIVERED);
// eventPool.on('PACKAGEDELIVERED', VENDORTHANKS);


// connection to server socket
server.on('connection',(socket)=>(payload)=>{
  console.log('Socket connected to Event Server!',socket.id);

  socket.on('REQUESTPICKUP', (payload)=>{
    logEvent('Request order Pickup',payload);
  });

  socket.on('PACKAGEINTRANSIT', (payload)=>{
    logEvent('Order In Transit',payload);
  });

  socket.on('PACKAGEDELIVERED',(payload)=>{
    logEvent('Package has been delivered',payload);
  });

});

// connection to CAPS namespace
CAPS.on('connection',(socket)=>{
  console.log('Socket connected to CAPS namespace!', socket.id);
});


function logEvent(event,payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT',{event,time,payload});
}
// "EVENT": {
//   "event": "pickup",
//   "time": "2020-03-06T18:27:17.732Z",
//   "payload": {
//     "store": "1-206-flowers",
//     "orderID": "e3669048-7313-427b-b6cc-74010ca1f8f0",
//     "customer": "Jamal Braun",
//     "address": "Schmittfort, LA"
//   }
// }
