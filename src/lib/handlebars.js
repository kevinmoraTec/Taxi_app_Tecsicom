const {format}=require('timeago.js') // importamos el metodo formato


const helpers={};//creamos un objeto

helpers.timeago=(timestamp)=>{//metodo recive un timestamp
    return format(timestamp);
};
module.exports=helpers;