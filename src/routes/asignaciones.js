// Taxistas Resivira peticiones para los taxistas 
const express=require('express');
const pool = require('../database');
const router=express.Router();

router.get('/allasignaciones',async(req,res)=>{
    const listarAsignaciones=await pool.query('SELECT * FROM Request ORDER BY idRequest DESC limit 1;')
    
    console.log(listarAsignaciones[0])
    res.send(listarAsignaciones[0])
    //res.render('../views/drivers/asignaciones.hbs',{listarAsignaciones:listarAsignaciones[0]})
})


router.post('/allasignaciones',async(req,res)=>{
    const {idRequest}=req.body
    console.log("Id Request ="+idRequest)
    const driverAc=await pool.query('SELECT * FROM DriverActivo ORDER BY idDriverActivo DESC limit 1;');
    const idDriver=driverAc[0].idDriverBd;
    //console.log(driverAc[0].idDriverBd)
        const query="INSERT INTO `bdAplication_taxi`.`Viajes` (`idRequest`, `idDriverViaje`) VALUES ('"+[idRequest]+"', '"+[idDriver]+"');"
        pool.query(query,[idRequest,idDriver])
        res.redirect('/profileDrivers')
})


module.exports=router;