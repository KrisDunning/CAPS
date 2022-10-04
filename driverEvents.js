
'use strict';
let eventPool=require('./eventPool');

function TOBEDELIVERED(thePayload){
  setTimeout(() => {
    console.log(`Driver: picked up ${thePayload.orderId}.`,thePayload);
    console.log('Package in transit.');
    eventPool.emit('PACKAGEINTRANSIT',thePayload);
  }, 500);
}

function PACKAGEDELIVERED(thePayload){
  setTimeout(() => {
    console.log(`Driver: delivered ${thePayload.orderId}.`,thePayload);
    eventPool.emit('DELIVERED',thePayload);
  }, 500);
}

module.exports={TOBEDELIVERED,PACKAGEDELIVERED};
