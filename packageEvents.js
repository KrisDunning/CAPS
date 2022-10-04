
'use strict';
const eventPool=require('./eventPool');
const {TOBEDELIVERED}=require('./driverEvents');
const {PACKAGEDELIVERED}=require('./driverEvents');
const {REQUESTPICKUP}=require('./vendorEvents');
const {VENDORTHANKS}=require('./vendorEvents');


eventPool.on('START',REQUESTPICKUP);
eventPool.on('REQUESTPICKUP', TOBEDELIVERED);
eventPool.on('PACKAGEINTRANSIT', PACKAGEDELIVERED);
eventPool.on('PACKAGEDELIVERED', VENDORTHANKS);


setInterval(() => {
  console.log('---------new interval begins---------');
  eventPool.emit('START','TheStoreName');
  console.log('START called');
}, 4000);

