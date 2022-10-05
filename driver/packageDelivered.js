'use strict';

module.exports=(socket)=>(payload)=>{
  console.log('package delivered activated');
  socket.emit('PACKAGEDELIVERED',payload);
};
