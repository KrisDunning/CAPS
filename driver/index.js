'use strict';
const {io} = require('socket.io-client');
const socket =io('http://localhost:3002');
const deliveryRequest = require('./packageInTransit');

const handleDeliverRequest = deliveryRequest(socket);

socket.on('REQUESTPICKUP', handleDeliverRequest);
