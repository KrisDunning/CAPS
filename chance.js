'use strict';

const Chance = require('chance');

const chance = new Chance();


let thePayload={
  store: chance.company(),
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
};

module.exports=(thePayload);
