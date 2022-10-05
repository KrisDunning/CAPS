'use strict';
const {io} = require('socket.io-client');
const socket =io('http://localhost:3002');
const request= require('./requestPickup');
const Chance=require('chance');
let chance = new Chance();



function VENDORTHANKS(thePayload){
  setTimeout(() => {
    console.log(`Thank you ${thePayload.customer}`);
  }, 500);
}

function newOrder(){
  let order={
    store :chance.company(),
    orderID: chance.guid(),
    customer : chance.name(),
    address: chance.address()
  }
  return order;
}
const createRequest=request(socket);

setTimeout(() => {
  let order = newOrder();
  createRequest(order);
}, 4000);

