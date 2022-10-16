'use strict';
const Chance=require('chance');
let chance = new Chance();
let msgClient = require('../lib/messageClient');
let flowerClient= new msgClient("flower");

function newOrder(storeName){
  let order={
    store :storeName,
    orderID: chance.guid(),
    customer : chance.name(),
    address: chance.address()
  }
  return order;
}

flowerClient.subscribe('CUSTOMERTHANKS', payload =>{
  console.log('delivered response active');
  console.log(`Thanks ${payload.customer}`);
});

setInterval(() => {
  console.log('REQUESTPICKUP active');
  flowerClient.publish('REQUESTPICKUP',newOrder('flower store'));
}, 10000);

