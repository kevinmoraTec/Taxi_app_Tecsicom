const {format}=require('timeago.js') // importamos el metodo formato


const helpers={};//creamos un objeto

helpers.timeago=(timestamp)=>{//metodo recive un timestamp
    return format(timestamp);
};
module.exports=helpers;

//https://www.youtube.com/watch?v=qJ5R9WTW0_E
//1.33