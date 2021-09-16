// para Crud de  los Conductores 
const express=require('express');
const router=express.Router(); //objeto para definir rutas del navegador
const pool=require('../database')//utilizamos la coneccion para guardar eliminar 
const passport=require('passport');
const helpers = require('../lib/helpers');


router.get('/signupDrives',(req,res)=>{
    res.render('../views/drivers/signupDrivers.hbs')
})

router.post('/signupDrives',passport.authenticate('driver.signup',{
    successRedirect:'/profileimgDriver',
    failureRedirect:'/signupDrives',
    failureFlash:true
}))
    


router.get('/profileimgDriver',(req,res)=>{
    res.render('../views/drivers/profileImgDriver.hbs')
})

//Guardamos una Imagen en la bd ImagenesUser
router.post('/profileimgDriver',async(req,res)=>{
    const {mimetype,filename,path}=req.file;
    console.log("las "+mimetype,filename,path)
        //limit 1
        await pool.query("SELECT idDriver FROM Drivers ORDER BY idDriver DESC;",(err,rows,fields)=>{
        
        if (!err) {
            let idUltimoUsr;
            for(const[p,v]of Object.entries(rows[0])){//Obtenemps el Ultimo id de mi Tabla Users para asginarlo a la Imgen
                idUltimoUsr=v;
            }
            //Insertamos la imagen en la base de datos
            pool.query("INSERT INTO `bdAplication_taxi`.`ImgDrivers` (`idDriver`, `Type`, `Name`,`Data`) VALUES ('"+[idUltimoUsr]+"', '"+[mimetype]+"', '"+[filename]+"','"+[path]+"');",(err,rows,fields )=>{
                if (!err) {
                    req.flash('success','Se Guardo Correctamente la Imagen')
                    res.redirect('/signinDriver')
                    //res.send('Se guardo la Imagen Revisala (Aqui Falta el signin)')
                    console.log('Se guardo la Imagen Revisala')
                } else {
                    console.log("No se Inserto en la BD "+err)
                }
            })
            //
        } else {
            console.log("Error al obtener el ultim iddeUSer para asignarlo a la img"+err)
        }
    })  
})


// Para renderizar el formulario de registro
router.get('/signinDriver',(req,res)=>{
    res.render('../views/drivers/signinDrivers.hbs')
})

/// Para resivir los datos de Auntenticacion del usuario
router.post('/signinDriver',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile', //si todo a salido bien me redirecciona 
        failureRedirect:'/signin',
        failureFlash: true
    })(req,res,next)
})


/// Para Mostrar todos los Conductores registrados 
router.get('/allDrivers',async(req,res)=>{
   const listarDrivers=await pool.query('SELECT * FROM bdAplication_taxi.Drivers')
    res.render('../views/drivers/allProfileDrivers.hbs',{listarDrivers})
})
    
    



module.exports=router;