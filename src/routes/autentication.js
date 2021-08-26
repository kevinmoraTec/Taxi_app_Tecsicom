// para logear los usuarios del sistema y clientes
const express=require('express');
const router=express.Router(); //objeto para definir rutas del navegador
const mysqlConnection=require('../database')//utilizamos la coneccion para guardar eliminar 
const passport=require('passport');
const helpers = require('../lib/helpers');

router.get('/signup',(req,res)=>{// Ruta para Renderizar el Formulario
    res.render('../views/autentication/signup.hbs')
})

// router.post('/signup',(req,res)=>{//Ruata par recivir los datos del Formulario
//     passport.authenticate('local.signup',{
//         successRedirect:'/profile',
//         failureRedirect:'/signup',
//         failureFlash: true 
//     });
//     //console.log(req.body)
//     res.send('ok')
// })

router.post('/signup',passport.authenticate('local.signup',{ 
    successRedirect:'/profileimg',
    failureRedirect:'/signup',
    failureFlash: true 
}))


// Para renderizar el formulario de registro
router.get('/signin',(req,res)=>{
    res.render('../views/autentication/signin.hbs')
})

/// Para resivir los datos de Auntenticacion del usuario
router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile', //si todo a salido bien me redirecciona 
        failureRedirect:'/signin',
        failureFlash: true
    })(req,res,next)
})





/// Para el perfil de los usuarios cuando inicien seecion
router.get('/profile',(req,res)=>{
    res.send('this is your profile')
})


router.get('/profileimg',(req,res)=>{
    res.render('../views/autentication/profileimg.hbs')
})

//Guardamos una Imagen en la bd ImagenesUser
router.post('/profileimg',async(req,res)=>{
    const {mimetype,filename,path}=req.file;
    console.log("las "+mimetype,filename,path)
        //limit 1
        await mysqlConnection.query("SELECT idUser FROM User ORDER BY idUser DESC;",(err,rows,fields)=>{
        
        if (!err) {
            let idUltimoUsr;
            for(const[p,v]of Object.entries(rows[0])){//Obtenemps el Ultimo id de mi Tabla Users para asginarlo a la Imgen
                idUltimoUsr=v;
            }
            //Insertamos la imagen en la base de datos
            mysqlConnection.query("INSERT INTO `bdAplication_taxi`.`ImgUsers` (`id_User`, `Type`, `Name`,`Data`) VALUES ('"+[idUltimoUsr]+"', '"+[mimetype]+"', '"+[filename]+"','"+[path]+"');",(err,rows,fields )=>{
                if (!err) {
                    req.flash('success','Se Guardo Correctamente la Imagen')
                    res.send('Se guardo la Imagen Revisala')
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

// router.post('/add',async (req,res)=>{
//     let fecha=new Date();
//     console.log(req.body)
//     const {startDireccion,finalDireccion,descripcion}=req.body
    
//     let id=1
//     const query="INSERT INTO `bdAplication_taxi`.`Request` (`id_User`,`StartDirection`, `FinalDirection`, `Descriptions`) VALUES ('"+id+"','"+startDireccion+"', '"+finalDireccion+"', '"+descripcion+"')"
//     await mysqlConnection.query(query,[startDireccion,finalDireccion,descripcion],(err,rows,filds)=>{
//         if(!err){
//             req.flash('success','Se genero una peticion Correctamente')
//             console.log('Se guardo un Peticion de Taxi')
//             res.redirect('/peti')

//         }else{
//             console.log('Error de Taxi'+err)
//         }
//     })
// })

///// Para poder Listar  los Clientes registrados 
router.get('/allUsers',async(req,res)=>{
    await mysqlConnection.query("SELECT * FROM bdAplication_taxi.User;",(err,rows,fields)=>{
        if (!err) {
            let listarUsuarios=rows
            console.log(listarUsuarios)
            res.render('../views/autentication/allProfile.hbs',{listarUsuarios})
        } else {
            console.log('error Listar todos los usuarios'+err)
        }
    })
});

//// Para eliminar un usuario registrado ///1.40
router.get('/deleteUser/:idUser',async(req,res)=>{
    const {idUser} =req.params

    await mysqlConnection.query("DELETE FROM `bdAplication_taxi`.`User` WHERE `idUser`='"+[idUser]+"';",(err,rows,fields)=>{
        if (!err) {
            res.redirect('/allUsers')
        } else {
            console.log('Error al Eliminar UserRegistraso'+err)
        }
    })
    // console.log(req.params.idUser)
    // res.send('Eliminado')
})

router.post('/allUsers',(res,req)=>{
    
})

/// Para Poder editar los datos del perfil de User.
router.get('/editUser/:idUser',async(req,res)=>{
    const {idUser}=req.params;
    console.log(idUser)
    await mysqlConnection.query("SELECT * FROM `bdAplication_taxi`.`User` WHERE `idUser`='"+[idUser]+"';",(err,rows,fields)=>{
        if(!err){
            const edit=rows[0];
            console.log(edit)
            res.render('../views/autentication/editProfile.hbs',{edit})
        }else{
            console.log("Eror Editar User"+err)
        }     
    })
})

// Editar los datos del Perfil

router.post('/editUser/:idUser',async (req,res)=>{
    const {idUser} =req.params
    const {nombre,numbePhone,email,nickname,ruc,direccion}=req.body;
    const newUser={
        nombre,
        numbePhone,
        email,
        nickname,
        ruc,
        direccion 
    };
   // newUser.password=await helpers.encriptePassword(password)//utlizamos el metdo para encriptar la contraseña y nos retorna encriptada 
    await mysqlConnection.query("UPDATE `bdAplication_taxi`.`User` SET `NameUser`='"+[nombre]+"', `NumberPhone`='"+[numbePhone]+"', `Email`='"+[email]+"',`Nickname`='"+[nickname]+"', `Ruc`='"+[ruc]+"', `Direccion`='"+[direccion]+"' WHERE `idUser`='"+[idUser]+"';",(err,rows,fields)=>{
        if(!err){
            console.log('Actualizado con Exito')
            res.redirect('/allUsers')
        }else{
            console.log('Error al Actualizar Perfil'+err)

        }
    })
})



module.exports=router;