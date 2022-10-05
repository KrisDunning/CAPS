'use strict';

module.exports=(socket)=>(payload)=>{
  console.log('in transit activated');
  socket.emit('PACKAGEINTRANSIT',payload);
};

