'use strict';
const {io} = require('socket.io-client');
const socket =io('http://localhost:3002');
const deliveryRequest = require('./packageInTransit');
const inTransit = require('./packageDelivered');

const handleDeliverRequest = deliveryRequest(socket);
const handleInTransit = inTransit(socket);

socket.on('REQUESTPICKUP', handleDeliverRequest);
socket.on('PACKAGEINTRANSIT',handleInTransit);
