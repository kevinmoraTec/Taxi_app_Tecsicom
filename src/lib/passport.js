//Procesamos los datos de Registra para manejarlo con los modulos passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

//Cuando el usuario Quiera acceder a nuestro sistema se logee
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const rows = await pool.query("SELECT * FROM User WHERE Email=?", [
        email,
      ]);
      if (rows.length > 0) {
        ///Verificamos si el correo que ingrsa el User existe
        const user = rows[0];
        console.log("de Signin " + user);
        const validPassword = await helpers.compararPassword(
          password,
          user.Password
        );
        console.log("!<<<! " + validPassword);
        if (validPassword) {
          //Verificamos que las Contraseñas sean iguales del Usuario
          done(
            null,
            user,
            req.flash("success", "Welcome " + user.NameUser + " Estas Activ@")
          );
        } else {
          //Si la contraseña no es Igual
          done(null, false, req.flash("message", "Incorrecto Password "));
        }
      } else {
        //Si no existe el correo
        console.log("No se encontro el User");
        return done(
          null,
          false,
          req.flash("message", "El Usario con ese Correo no Existe")
        );
      }
    }
  )
);

/// Registrar al usuario en mi Base de datos y lo serializamos y deserialisamos
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { nombre, numbePhone, nickname, birthayDate, ruc, direccion } =
        req.body;
      const newUser = {
        nombre,
        numbePhone,
        email,
        password,
        nickname,
        birthayDate,
        ruc,
        direccion,
      };
      //console.log(req.body)
      const newPassword = await helpers.encriptarPassword(password);
      const query =
        "INSERT INTO `bdAplication_taxi`.`User` (`NameUser`, `NumberPhone`, `Email`, `Password`, `Nickname`, `BirthdayDate`, `Ruc`, `Direccion`) VALUES ('" +
        nombre +
        "', '" +
        numbePhone +
        "', '" +
        email +
        "', '" +
        newPassword +
        "', '" +
        nickname +
        "', '" +
        birthayDate +
        "', '" +
        ruc +
        "', '" +
        direccion +
        "');";
      const result = await pool.query(query, [
        nombre,
        numbePhone,
        nickname,
        birthayDate,
        ruc,
        direccion,
      ]);
      newUser.idUser = result.insertId;
      console.log(result);
      return done(null, newUser);
    }
  )
);  

passport.serializeUser((user, done) => {
  done(null, user.idUser);
});

passport.deserializeUser(async (idUser, done) => {
  const rows = await pool.query("SELECT * FROM User WHERE idUser=?", [idUser]);
  done(null, rows[0]);
   //console.log('deserializar  '+Object.values(rows[0]))
});


//Cuando Inicie seccion el CONDUCTOR
passport.use('driver.signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},async(req,email,password,done)=>{
  const rows=await pool.query('SELECT * FROM Drivers WHERE Email=?',[email])
  if(rows.length > 0){
    const user=rows[0];
    const validPassword=await helpers.compararPassword(password,user.Password)
    if(validPassword){
      console.log('Entro Aqui Yes')
      done(null,user,req.flash("success", "Welcome " +user.NameDriver+ "Estas Activo"))
    }else{
      console.log('Entro Aqui False')
      done(null,false,req.flash("message", "Incorrecto Password "))
    } 
  }else{
    return done(null,false,req.flash("message", "El Email no Existe "))
  }
}))

//Guardamos un Conductor en la base de datos
passport.use('driver.signup',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},async(req,email,password,done)=>{
  //console.log(req.body)
  const {nombre,nickname,placa,ruc,numeroPhone,direccion,dateBirthay}=req.body
  const newDriver={
      nombre,
      nickname,
      placa,
      ruc,
      numeroPhone,
      direccion,
      email,
      password,
      dateBirthay
  }
   const newPassword= await helpers.encriptarPassword(password)
  const query="INSERT INTO `bdAplication_taxi`.`Drivers` (`NameDriver`, `Nickname`, `PlacaDriver`, `Ruc`, `NumberPhone`, `AddressDriver`, `Email`, `Password`, `DateBirthday`) VALUES ('"+nombre+"', '"+nickname+"', '"+placa+"', '"+ruc+"', '"+numeroPhone+"', '"+direccion+"', '"+email+"', '"+newPassword+"', '"+dateBirthay+"');"
   const result=await pool.query(query,[nombre,nickname,placa,ruc,numeroPhone,direccion,email,password,dateBirthay])
   //console.log(result)
   newDriver.idDriver =result.insertId;
   return done(null,newDriver)

}));



passport.serializeUser((driver,done)=>{
  done(null,driver.idDriver)
})
passport.deserializeUser(async (idDriver, done) => {
  const rows = await pool.query("SELECT * FROM Drivers WHERE idDriver=?", [idDriver]);
  done(null, rows[0]);
  console.log('deserializar Driv'+Object.values(rows[0]))
});

