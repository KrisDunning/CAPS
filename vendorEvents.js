//3) module for managing vendor events
'use strict';
let eventPool=require('./eventPool');
const thePayload=require('./chance');

function REQUESTPICKUP(storeName){
  setTimeout(() => {
    console.log('REQUESTPICKUP active', storeName);
    thePayload.store=storeName;
    eventPool.emit('REQUESTPICKUP',thePayload);
  }, 500);
}

function VENDORTHANKS(thePayload){
  setTimeout(() => {
    console.log(`Thank you ${thePayload.customer}`);
  }, 500);
}

module.exports={REQUESTPICKUP,VENDORTHANKS};
