//Procesamos los datos de Registra para manejarlo con los modulos passport

const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;
const mysqlConnection=require('../database')
const helpers=require('../lib/helpers')

// Login de Usuario / Una vez que el Usuario se registra debe iniciar seccion

passport.use('local.signin',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
},async(req,email,password,done)=>{
    console.log(req.body)
    console.log(email)
    console.log(password)

    await mysqlConnection.query("SELECT * FROM bdAplication_taxi.User where Email ='"+[email]+"';",(err,rows,fields)=>{
        if(!err){
            console.log(rows[0])
            if (rows.length > 0) {// Siencotro un registro con ese correo
                console.log('Si lo encontre')
                const user=rows[0]
              const valiPassword= helpers.matchPassword(password,user.Password)//almacenamos un true o false
                if(valiPassword){
                    done(null,user,req.flash('success','Wlwcome'+user.NameUser))
                }else{
                    console.log('Contraseña Incorrecta')
                    done(null,false,req.flash('message','Incorrect password'))
                }
            }else{
                console.log('Email no eexiste')
                return done(null,false,req.flash('message','Email no Existe'))
            } 
        }else{
            console.log('Eror buscar correr passport signin '+err)
        }
    })
}))



/// Guardamos un Usuario Y Encriptamos su Constraseña // Signup /(Cuando se registra) 
passport.use('local.signup',new LocalStrategy({ //aqui a dentro colocamos lo que queremos recibir
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req,email,password,done)=>{//Definimos qie lo que va hacer al momento que dse registren
    const {nombre,numbePhone,nickname,birthayDate,ruc,direccion}=req.body;
    const newUser={
        nombre,
        numbePhone,
        email,
        password,   
        nickname,
        birthayDate,
        ruc,
        direccion 
    };
    //Encriptamos la contraseña y la Guardamos
    newUser.password=await helpers.encriptePassword(password)//utlizamos el metdo para encriptar la contraseña y nos retorna encriptada  
    
    mysqlConnection.query("INSERT INTO `bdAplication_taxi`.`User` (`NameUser`,`NumberPhone`, `Email`, `Password`, `Nickname`, `BirthdayDate`, `Ruc`, `Direccion`) VALUES ('"+[nombre]+"','"+[numbePhone]+"','"+[email]+"', '"+[newUser.password]+"', '"+[nickname]+"', '"+[birthayDate]+"', '"+[ruc]+"', '"+[direccion]+"');",(err,rows,filds)=>{
       //newUser.idUser=rows.insertId
        if(!err){
            console.log(rows)
           newUser.idUser=rows.insertId;
            return done(null,newUser)
            console.log('Se guardo un Usuario de Taxi')
        }else{
            console.log('Error de Guardar User'+err)
        }
    })

}));

passport.serializeUser((user,done)=>{//Almacenamos al user en seccion
    done(null,user.idUser);
});

passport.deserializeUser(async (idUser,done)=>{
    await mysqlConnection.query("SELECT * FROM bdAplication_taxi.User where idUser ='"+[idUser]+"';",(err,rows,filds)=>{
        if (!err) {
            console.log("Deserializar"+rows[0])
            console.log(Object.values(rows[0]));
            //done(null,rows[0])
        } else {
            console.log("Error en deserializeUser consulta "+err)
        }
        done(null,rows[0])
    })
    //done(null,user)
   // done(null,idUser)
})