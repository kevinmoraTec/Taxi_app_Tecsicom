const express=require('express')
const morgan=require('morgan')// Muestra por consola todas las Peticioes que van llegando 
const  exphbs=require('express-handlebars')
const path=require('path')
const session=require('express-session')
const mySqlStore=require('express-mysql-session')
const {database}=require('./keys')
const passport=require('passport')
const multer=require('multer')
const { v4: uuidv4 } = require('uuid');
const flash=require('connect-flash')


// Inicializaciones 
const app=express();
require('./lib/passport')

const storage=multer.diskStorage({
    destination:path.join(__dirname,'./public/updownImg'),
    filename:(req,file,cb)=>{
        cb(null,uuidv4()+path.extname(file.originalname))//uuidv4() crean numeros al azar 
    }
})


//settigs
app.set('port',process.env.PORT || 4000 ) // SI EXISTE UN PUERTO TOMALO O TOAMA EL 4000
app.set('views',path.join(__dirname,('views')))

app.engine('.hbs',exphbs({//configuramos nuesromotro de Platntillas 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine ','.hbs');

// Middlewars
app.use(session({
    secret: 'sessionesGuardadasPeticiones',
    resave: false,
    saveUninitialized: false,
    store: new mySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))// Nos permite aceptar desde el formulario los datos que se envien 
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



app.use(multer({
    storage,
    dest: path.join(__dirname,'./public/updownImg'),
    fileFilter:(req,file,cb)=>{
        const fileTypes=/jpeg|png|jpg/;
        const mimetype=fileTypes.test(file.mimetype)
        const extname=fileTypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null,true)
        } else {
            alert('Ingese una Imagen')
            cb("Error: Al archivo tiene un formato no soportado o ")
            //req.flash('success','Se genero una peticion Correctamente')
        }
    }
}).single('imgPerfil'))


//Variables Globales 
app.use((req,res,next)=>{
    app.locals.success=req.flash('success')//tomamos esa variable de msj y lo hacemos disponible en todas las vistas
    app.locals.message=req.flash('message')
    app.locals.user=req.user
    app.locals.driver=req.user
    next();
})


//Routes 
app.use(require('./routes/index'))
app.use(require('./routes/autentication'))
app.use(require('./routes/peticiones'))
app.use(require('./routes/asignaciones'))
app.use(require('./routes/drivers'))


//Public
app.use(express.static(path.join(__dirname,'public')))

//Empezar Servidor 
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
})





