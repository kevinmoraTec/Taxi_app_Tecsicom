// para logear los usuarios del sistema y clientes
const express=require('express');
const router=express.Router(); //objeto para definir rutas del navegador
const pool=require('../database')//utilizamos la coneccion para guardar eliminar 
const passport=require('passport');
const helpers = require('../lib/helpers');
const {isLoggedIn}=require('../lib/auth')





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

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect:'/profileimg',
        failureRedirect: '/signup',
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
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('../views/profile.hbs')
})


router.get('/profileimg',(req,res)=>{
    res.render('../views/autentication/profileimg.hbs')
})

//Guardamos una Imagen en la bd ImagenesUser
router.post('/profileimg',async(req,res)=>{
    const {mimetype,filename,path}=req.file;
    console.log("las "+mimetype,filename,path)
        //limit 1
        await pool.query("SELECT idUser FROM User ORDER BY idUser DESC;",(err,rows,fields)=>{
        
        if (!err) {
            let idUltimoUsr;
            for(const[p,v]of Object.entries(rows[0])){//Obtenemps el Ultimo id de mi Tabla Users para asginarlo a la Imgen
                idUltimoUsr=v;
            }
            //Insertamos la imagen en la base de datos
            pool.query("INSERT INTO `bdAplication_taxi`.`ImgUsers` (`id_User`, `Type`, `Name`,`Data`) VALUES ('"+[idUltimoUsr]+"', '"+[mimetype]+"', '"+[filename]+"','"+[path]+"');",(err,rows,fields )=>{
                if (!err) {
                    req.flash('success','Se Guardo Correctamente la Imagen')
                    res.redirect('/signin')
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


///// Para poder Listar  los Clientes registrados 
router.get('/allUsers',async(req,res)=>{
    const listarPeticiones=await pool.query('SELECT * FROM bdAplication_taxi.User');
    //console.log(listarUsuarios)
    res.render('../views/autentication/allProfile.hbs',{listarUsuarios})
    //res.redirect('/allUsers')
})

//// Para eliminar un usuario registrado ///1.40
router.get('/deleteUser/:idUser',isLoggedIn,async(req,res)=>{
    const {idUser} =req.params
    await pool.query('DELETE FROM User WHERE idUser =?',[idUser])
    req.flash('success','Usuario Eliminado Correctamente')
    res.redirect('/allUsers')
    // console.log(req.params.idUser)
    // res.send('Eliminado')
})


/// Para Poder editar los datos del perfil de User.
router.get('/editUser/:idUser',isLoggedIn,async(req,res)=>{
    const {idUser}=req.params;
    const profile= await pool.query('SELECT * FROM User WHERE idUser =?',[idUser])
    console.log(profile[0])
    res.render('../views/autentication/editProfile.hbs',{profile:profile[0]})
})


// Editar los datos del Perfil
router.post('/editUser/:idUser',isLoggedIn,async (req,res)=>{
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
    console.log(newUser)
    // pool.query("UPDATE `bdAplication_taxi`.`User` SET `NameUser`='"+nombre+"', `NumberPhone`='"+numbePhone+"', `Email`='"+email+"', `Nickname`='"+nickname+"', `Ruc`='"+ruc+"', `Direccion`='"+direccion+"' WHERE `idUser`='"+[idUser]+"';")
    const query="UPDATE `bdAplication_taxi`.`User` SET `NameUser`=?, `NumberPhone`=?, `Email`=?, `Nickname`=?, `Ruc`=?, `Direccion`=? WHERE `idUser`='"+[idUser]+"';"
    pool.query(query,[nombre,numbePhone,email,nickname,ruc,direccion])
     req.flash('success','Perfil Actualizado Correctamente')
     res.redirect('/allUsers')
})

router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/signin');
})



module.exports=router;