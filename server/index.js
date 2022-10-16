'use strict';
const {Server} = require('socket.io');
const PORT = 3002;
// assign socket.io as the server on 3002
const server = new Server(PORT);
//namespace
const CAPS = server.of('/CAPS');
const Queue = require('../lib/queue');
const messageQueue= new Queue();


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
    // queue add implementation
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.orderId, payload);
    console.log('Request Pickup - ',JSON.stringify(messageQueue));
    // end queue add implementation
    socket.broadcast.emit('PICKEDUP',payload);
  });

  socket.on('PACKAGEINTRANSIT', (payload)=>{
    logEvent('Package In Transit',payload);
    // remove pickup from flower queue
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.orderId, payload);
    console.log('This order is in transit: ', currentQueue.read(payload.orderId));
    console.log('In transit - ',JSON.stringify(messageQueue));
    currentQueue = messageQueue.read('flower');
    if(!currentQueue){
      throw new Error('no queue created');
    }
    let message = currentQueue.remove(payload.orderId);
    console.log('This has been deleted :PACKAGEINTRANSIT', message);
    console.log(JSON.stringify(messageQueue));
    // end remove pickup from flower queue
    socket.emit('PACKAGEDELIVERED',payload);
  });

  socket.on('DELIVERYCONFIRMED', (payload)=>{
    logEvent('Package delivery confirmation sent to vendor',payload);
    // remove deliver request from driver queue
    let currentQueue = messageQueue.read(payload.queueId);
    console.log(JSON.stringify(messageQueue));
    if(!currentQueue){
      throw new Error('no queue created');
    }
    let message = currentQueue.remove(payload.orderId);
    console.log('This has been deleted from the key: DELIVERED', message);
    console.log(JSON.stringify(messageQueue));
    // end remove deliver request from driver queue
    socket.broadcast.emit('CUSTOMERTHANKS',payload);
  });

  socket.on('GETDELIVERIES', (payload) => {
    console.log('This happened');
    let currentQueue = messageQueue.read('flower');
    if(currentQueue && currentQueue.data){
      console.log('current queue to resend for deilvery',JSON.stringify(currentQueue));
      Object.keys(currentQueue.data).forEach(message => {
        socket.emit('REQUESTPICKUP', currentQueue.read(message));
      });
    }
  });

});

function logEvent(event,payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('LOG EVENT',{event,time,payload});
}

