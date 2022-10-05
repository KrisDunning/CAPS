'use strict';
const {io} = require('socket.io-client');
const socket =io('http://localhost:3002');
const request= require('./requestPickup');
const delivered = require('./deliveredResponse');
const Chance=require('chance');
let chance = new Chance();


function newOrder(){
  let order={
    store :chance.company(),
    orderID: chance.guid(),
    customer : chance.name(),
    address: chance.address()
  }
  return order;
}
let handleDelivered=delivered(socket);
socket.on('PACKAGEDELIVERED', handleDelivered);
const createRequest=request(socket);

setTimeout(() => {
  let order = newOrder();
  createRequest(order);
}, 4000);

