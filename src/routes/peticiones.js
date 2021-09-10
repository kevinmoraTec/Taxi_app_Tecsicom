// Usuario creara peticiones para los taxistas 

const express=require('express')
const router=express.Router();
const pool=require('../database')

/// Mostramos en Formulario para emitir una Solicitud de taxi
router.get('/add',(req,res)=>{
    res.render('../views/peticiones/add.hbs')
})

///Guardamos una peticion de taxi
router.post('/add',async (req,res)=>{
    //let fecha=new Date(); 
    console.log(req.body)
    let id=2
    const {startDireccion,finalDireccion,descripcion}=req.body
    const newPeticion={
        
        startDireccion,
        finalDireccion,
        descripcion
    }
    console.log(newPeticion)
    const query="INSERT INTO `bdAplication_taxi`.`Request` (`id_User`,`StartDirection`, `FinalDirection`, `Descriptions`) VALUES ('"+id+"','"+startDireccion+"', '"+finalDireccion+"', '"+descripcion+"')"
    await pool.query(query,[startDireccion,finalDireccion,descripcion])
    
})

// Listamos todas las peticions creadas  
router.get('/allpeticiones',async (req,res)=>{
    // 1.19 //https://www.youtube.com/watch?v=qJ5R9WTW0_E 
    await mysqlConnection.query("SELECT * FROM bdAplication_taxi.Request",(err,rows,fields)=>{
        if(!err){
            let listaPeticiones=rows
            //console.log(listaPeticiones)

            res.render('../views/peticiones/listPeticiones.hbs',{listaPeticiones})
            //const v=fields[2].type
            //console.log(v+1)
        }else{
            console.log("Eror listar peticiones"+err)
        }
    })
})

///eliminamos las Peticines con la funcionalidad en au boton
router.get('/delete/:id',async (req,res)=>{//cuando te envien a la ruta delete junto con id
    //console.log(req.params.id)//cuando me envia en ultimo parametro de mi ruta
    const {id} =req.params;
    //const query="DELETE FROM `bdAplication_taxi`.`Request` WHERE `idRequest`='"+idRequest+"'"
    
    await mysqlConnection.query("DELETE FROM `bdAplication_taxi`.`Request` WHERE `idRequest`='"+[id]+"';",(err,rows,filds)=>{
        if(!err){
            console.log("Se Elimino") 
            res.redirect('/peti')
        }else{
            console.log(err)
        }
    })
})

// Nueva ventana con la nota u¡u los datos que va a eliminar
router.get('/edit/:id',async (req,res)=>{
    const {id}=req.params;
    console.log('el id de Editar'+id)
    await mysqlConnection.query("SELECT * FROM `bdAplication_taxi`.`Request` WHERE `idRequest`='"+[id]+"';",(err,rows,filds)=>{
        if(!err){
            let edit=rows[0];
            console.log(edit)
    res.render('../views/peticiones/edit.hbs',{edit})
        }else{
            console.log("Eror Editar peticiones"+err)
        }     
    })
})

router.post('/edit/:id', async (req,res)=>{// Metodo para actualizar una nota ya agegada 
    const {id} = req.params;
    const {startDireccion,finalDireccion,descripcion}=req.body
    const newPeticion={// para validarlo 
        startDireccion,
        finalDireccion,
        descripcion
    }
    console.log(newPeticion)
    await mysqlConnection.query("UPDATE `bdAplication_taxi`.`Request` SET `StartDirection`='"+[startDireccion]+"', `FinalDirection`='"+[finalDireccion]+"', `Descriptions`='"+[descripcion]+"' WHERE `idRequest`='"+[id]+"';",(err,rows,filds)=>{
        if(!err){
            console.log('Actualizado con Exito')
            res.redirect('/peti')
        }else{
            console.log('Error al Actualizar Peticion'+err)

        }
    })
    

})




module.exports=router;