// para Crud de  los Conductores 
const express=require('express');
const router=express.Router(); //objeto para definir rutas del navegador
const pool=require('../database')//utilizamos la coneccion para guardar eliminar 
const passport=require('passport');
const helpers = require('../lib/helpers');
const { route } = require('./autentication');


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
    passport.authenticate('driver.signin',{
        successRedirect: '/profileDrivers',
        failureRedirect: '/signinDriver',
        failureFlash: true
    })(req,res,next)
}) 


/// Para Mostrar todos los Conductores registrados 
router.get('/allDrivers',async(req,res)=>{
   const listarDrivers=await pool.query('SELECT * FROM bdAplication_taxi.Drivers')
    res.render('../views/drivers/allProfileDrivers.hbs',{listarDrivers})
})

///Para Eliminar Un Conductor Seleccionado.
router.get('/deleteDriver/:idDriver',async(req,res)=>{
    const{idDriver}=req.params;
    await pool.query('DELETE  FROM Drivers WHERE idDriver=?',[idDriver])
    req.flash('success','Driver Eliminado Correctamente')
    res.redirect('/allDrivers')
})

/// Para Editara Un Conductor Seleccionado.
router.get('/editDriver/:idDriver',async(req,res)=>{
    const {idDriver}=req.params;
    const profile=await pool.query('SELECT * FROM Drivers WHERE idDriver=?',[idDriver])
    console.log(profile[0])
    res.render('../views/drivers/editProfile.hbs',{profile:profile[0]})
})

/// Para Editar y Enviar Nuevos datos de Drivers
router.post('/editDriver/:idDriver',async(req,res)=>{
    const {idDriver}=req.params;
    const {nombre,nickname,placa,ruc,numberPhone,direccion,email}=req.body
    const newDriver={
        nombre,
        nickname,
        placa,
        ruc,
        numberPhone,
        direccion,
        email
    };
    const query="UPDATE `bdAplication_taxi`.`Drivers` SET `NameDriver`=?, `Nickname`=?, `PlacaDriver`=?, `Ruc`=?, `NumberPhone`=?, `AddressDriver`=?, `Email`=? WHERE `idDriver`='"+[idDriver]+"';"
    pool.query(query,[nombre,nickname,placa,ruc,numberPhone,direccion,email])
    req.flash('success','Perfil Actualizado Correctamente')
    res.redirect('/allDrivers')
})


//Una vez que ingerese el Driver

router.get('/profileDrivers',(req,res)=>{
    res.render('../views/profileDriver.hbs')
})


/// Para ver los usuarios Activos y asignar munualmente las Carreras 

router.post('/addDriverActivo',(req,res)=>{
    
    let estado=1;
    const {idDriverActivo,Nombre,placa,}=req.body
    console.log(req.body);
    const query="INSERT INTO `bdAplication_taxi`.`DriverActivo` (`idDriverActivo`, `Nombre`, `placa`, `estado`) VALUES ('"+idDriverActivo+"', '"+Nombre+"', '"+placa+"', '"+estado+"');"
    pool.query(query,[idDriverActivo,Nombre,placa,estado])
    res.send("Driver activo Asignado en la bd")
})

//Para Listar los Drivers Activos.
router.get('/allDriversActivos',async(req,res)=>{
    const listarDriversAct=await pool.query('SELECT * FROM bdAplication_taxi.DriverActivo;');
    //console.log(listarDriversAct)
    res.render('../views/autentication/alldriverActivo.hbs',{listarDriversAct})
})

 /// Asignar una peticion a un driver Esoecifico
 router.get('/asignarPeticionDriver/:idDriverActivo',async(req,res)=>{
    const {idDriverActivo}=req.params
    console.log(idDriverActivo);
    let estadoActivoUltimReques=1;

    const ultimaPeticionAsignada=await pool.query("SELECT idRequest FROM Request ORDER BY idRequest DESC;")
    // console.log(Object.keys(ultimaPeticionAsignada[0]))
    // console.log(Object.values(ultimaPeticionAsignada[0]))
    let idUltimoReques=Object.values(ultimaPeticionAsignada[0])

    const query="INSERT INTO `bdAplication_taxi`.`ViajeManual` (`idRequqest`, `idDriverActivo`, `estado`) VALUES ('"+idUltimoReques+"', '"+idDriverActivo+"', '"+estadoActivoUltimReques+"');"
    pool.query(query,[idUltimoReques,idDriverActivo,estadoActivoUltimReques])
    req.flash('success','Asignado Correctamente')
    res.redirect('/add')

})

let idultimarequest=0;
///// Aqui  validamos si es la peticion del Driver 
router.get('/selectViajeManual',async (req,res)=>{
    const atencion = await pool.query('SELECT * FROM ViajeManual where estado=1 ORDER BY idViajeManual DESC  limit 1 ;');
    let valores=Object.values(atencion[0])
    const idDriver=valores[2];
    const idViajeManual=valores[0];
     idultimarequest=valores[1];
    const estadoultimViajemanual=valores[3];


    res.send(atencion[0])
    console.log(atencion[0])
    console.log(idultimarequest)
})

router.get('/consultaDatosRequesAsignado/:idRequest',async(req,res)=>{
    const {idRequest}=req.params
    const datosAsignacion=await pool.query("SELECT * FROM bdAplication_taxi.Request where idRequest ="+idRequest+";")
    //console.log(datosAsignacion[0])
    res.send(datosAsignacion[0])
})

// Para editar el estado del Request cuando el driver la Acepte
router.get('/editarEstadoRequest/:idRequest',async (req,res)=>{
    const {idRequest}=req.params
    const datosAsignacionIdRequest=await pool.query("UPDATE `bdAplication_taxi`.`Request` SET `Estado`='0' WHERE `idRequest`='"+idRequest+"';")
    console.log('Update id Reques'+idRequest);
    console.log('Uodate Respuesta del Quety'+datosAsignacionIdRequest);
    res.send('Okey Peticion Asignada Dirigite a la Ubicacion Asignada')

})




module.exports=router;