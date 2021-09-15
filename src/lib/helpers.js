const bcrypt=require('bcryptjs');
const helpers={};

//Metodo para compara las contraseñas encryptadas

helpers.encriptarPassword=async(password)=>{
    const Salt_Round=12
    const encript=await bcrypt.hashSync(password,Salt_Round)
    console.log('!><! ' +encript)
    return encript;
}

helpers.compararPassword=async(passwordUser,bdPassword)=>{
    try {
    const valor=await bcrypt.compareSync(passwordUser,bdPassword)
    console.log('!<<<! ' +valor)
    return valor;
    } catch (error) {
        console.log('Error compareSync'+error)
    }
}

// helpers.encriptePassword= async(password)=>{//Recibimos la contraseña 
//     const salt=await bcrypt.genSalt(10)//Encriptamos la contraseña pcon un patron de 10 
//     console.log("SALT"+salt)
//     const finalPassword=await bcrypt.hash(password,salt);//cifrmaos la contraseña 
//     console.log("SALT"+finalPassword)
//     return finalPassword;
// }

// //Metodo para compara las contraseñas encryptadas
// // helpers.matchPassword =  async (password,savedPasword)=>{
// //     try {
    
// //     return await bcrypt.compare(password,savedPasword)

// //     } catch (error) {
// //         console.log("de la cpntraseñ"+error)
// //     }
// // };



module.exports=helpers;