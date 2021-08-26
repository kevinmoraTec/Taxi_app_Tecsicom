// para Crud de  los Conductores 
const express=require('express');
const router=express.Router(); //objeto para definir rutas del navegador
const mysqlConnection=require('../database')//utilizamos la coneccion para guardar eliminar 
const passport=require('passport');
const helpers = require('../lib/helpers');


router.get('/signupDrives',(req,res)=>{
    res.render('../views/drivers/signupDrivers.hbs')
})




module.exports=router;