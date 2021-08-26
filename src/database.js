const mysql=require('mysql')

const mysqlConnection=mysql.createConnection({ // Creamos la conexion con los parametros
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bdAplication_taxi',
    port: '8889'
})

mysqlConnection.connect(function (err){
    if(err){
        console.log("De la base de datos"+err);
        return;
    }else{
        console.log('Db is Coneccted Exelent')
    }
});

module.exports=mysqlConnection;