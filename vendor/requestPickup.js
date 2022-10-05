'use strict';


module.exports = (socket)=>(newOrder)=>{

    console.log('REQUESTPICKUP active');
    socket.emit('REQUESTPICKUP',newOrder);
}


