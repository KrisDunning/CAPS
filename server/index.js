'use strict';
const {Server} = require('socket.io');
const PORT = 3002;
// assign socket.io as the server on 3002
const server = new Server(PORT);
//namespace
const CAPS = server.of('/CAPS');
const Queue = require('../lib/queue');
const acmeMSGQueue= new Queue();
const flowersMSGQueue = new Queue();


// connection to CAPS namespace
CAPS.on('connection',(socket)=>{
  console.log('Socket connected to CAPS namespace!', socket.id);

  // can trigger events on join of CAPS namespace
  socket.on('JOIN',(queueId)=>{
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('REQUESTPICKUP', (payload)=>{
    logEvent('Request order Pickup',payload);
    console.log('request payload',payload);
    let currentQueue= flowersMSGQueue.read(payload.queueId);


    socket.broadcast.emit('REQUESTPICKUP',payload);
  });

  socket.on('PACKAGEINTRANSIT', (payload)=>{
    logEvent('Order In Transit',payload);
    socket.broadcast.emit('PACKAGEINTRANSIT',payload);
  });

  socket.on('PACKAGEDELIVERED', (payload)=>{
    logEvent('Package has been delivered',payload);
    socket.broadcast.emit('PACKAGEDELIVERED',payload);
  });

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
