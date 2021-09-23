// Usuario creara peticiones para los taxistas 

const express=require('express')
const router=express.Router();
const pool=require('../database')
const {isLoggedIn}=require('../lib/auth')

/// Mostramos en Formulario para emitir una Solicitud de taxi
router.get('/add',isLoggedIn,(req,res)=>{
    res.render('../views/peticiones/add.hbs')
})

///Guardamos una peticion de taxi
router.post('/add',async (req,res)=>{
    //let fecha=new Date(); 
    console.log(req.body)
    
    const {startDireccion,finalDireccion,descripcion}=req.body
    const newPeticion={
        
        startDireccion,
        finalDireccion,
        descripcion
    }
    let id=req.user;
    console.log(newPeticion)
    const query="INSERT INTO `bdAplication_taxi`.`Request` (`id_User`,`StartDirection`, `FinalDirection`, `Descriptions`) VALUES ('"+id.idUser+"','"+startDireccion+"', '"+finalDireccion+"', '"+descripcion+"')"
    await pool.query(query,[startDireccion,finalDireccion,descripcion])
    req.flash('success','Peticion creada Correctamente')
    res.redirect('/allpeticiones')//los redireccionamos a la vista donde esta sus Peticioes
    
})

// Listamos todas las peticions creadas  
router.get('/allpeticiones',async (req,res)=>{
    const peticiones=await pool.query("SELECT * FROM bdAplication_taxi.Request")
  console.log(peticiones)
  res.render('../views/peticiones/listPeticiones.hbs',{peticiones}) 
})

///eliminamos las Peticines con la funcionalidad en au boton
router.get('/delete/:id',async (req,res)=>{//cuando te envien a la ruta delete junto con id
    //console.log(req.params.id)//cuando me envia en ultimo parametro de mi ruta
    const {id} =req.params;
    //const query="DELETE FROM `bdAplication_taxi`.`Request` WHERE `idRequest`='"+idRequest+"'"
    await pool.query('DELETE FROM Request WHERE idRequest =?',[id])
    req.flash('success','Peticion Eliminada Correctamente')

    res.redirect('/allpeticiones')//los redireccionamos a la vista donde esta sus Peticioes
})

// Nueva ventana con la nota u¡u los datos que va a eliminar
router.get('/edit/:id',async (req,res)=>{
    const {id}=req.params;
    console.log('el id de Editar'+id)
    const peticionesID=await pool.query('SELECT * FROM Request WHERE idRequest=?',[id])    
    res.render('../views/peticiones/edit.hbs',{peticionesID:peticionesID[0]})
})

router.post('/edit/:id', async (req,res)=>{// Metodo para actualizar una nota ya agegada 
    const {id} = req.params;
    const {startDireccion,finalDireccion,descripcion}=req.body
    const newPeticion={// para validarlo 
        startDireccion,
        finalDireccion,
        descripcion
    }
    //console.log(newPeticion)
    const query="UPDATE `bdAplication_taxi`.`Request` SET `StartDirection`=?, `FinalDirection`=?, `Descriptions`=? WHERE `idRequest`='"+[id]+"';"
    await pool.query(query,[startDireccion,finalDireccion,descripcion])
    req.flash('success','Peticion Actualizada Correctamente')
    res.redirect('/allpeticiones') 
    //https://www.youtube.com/watch?v=qJ5R9WTW0_E
    //min 1.53
    

})




module.exports=router;