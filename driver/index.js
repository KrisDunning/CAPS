'use strict';
const msgClient = require('../lib/messageClient');
const driverClient= new msgClient('driver');

driverClient.publish('GETDELIVERIES');

driverClient.subscribe('PICKEDUP',payload=>{
  console.log('in transit activated');
  driverClient.publish('PACKAGEINTRANSIT',payload);
});
driverClient.subscribe('PACKAGEDELIVERED',payload=>{
  console.log('package delivered activated');
  driverClient.publish('DELIVERYCONFIRMED',payload);
});
