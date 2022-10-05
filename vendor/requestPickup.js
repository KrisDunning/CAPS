'use strict';


module.exports = (socket)=>(payload)=>{

    console.log('REQUESTPICKUP active');
    socket.emit('REQUESTPICKUP',payload);
}


