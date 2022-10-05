'use strict';

module.exports = (socket)=>(payload)=>{

    console.log('delivered response active');
    console.log(`Thanks ${payload.customer}`);
};
