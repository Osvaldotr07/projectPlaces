//Ejecuta el MVC en este caso como su nombre lo indica seria el controlador
const Place = require('../models/Place')
const upload = require('../config/uploads')
const helpers = require('./helpers')

const validParams = ['title', 'description', 'acceptCreditCard', 'openHour', 'closeHour', 'adress']

//Creamos la funcion del middleware
function find(req, res, next){
    Place.findOne({slug:req.params.id})
    .then(place => {
        req.place = place
        next();
    })
    .catch(err => {
        console.log(err)
        next(err);
    })
}

//Mostrar todos los lugares 
function index(req, res){
    //Encontrar todos los registros
    Place.paginate({}, {page: req.query.page || 1, limit: 20, sort:{'_id':-1} })
    .then(docs=> {
        res.json(docs)
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
}

//Crea un lugar
function create(req, res, next){
    let  params = helpers.buildParamas(validParams, req.body)
    console.log(params)
    //agregar un registro
    Place.create(params)
    .then(doc => {
        req.place = doc
        next();
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
}

//Muetra un lugar
function show(req, res){
    res.json(req.place)
}

//Actualiza un lugar
function update(req, res){
    let  params = helpers.buildParamas(validParams, req.body)
    req.place = Object.assign(req.place, params);
    
    req.place.save().then(doc=>{
        res.json(doc)
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
}

//Elimina un lugar
function remove(req, res){
   req.place.remove().then(doc=> {
        res.json({})
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
}

//Controlador para subit imagenes

function multerMiddleware(){
    return upload.fields([
        {name: 'avatar', maxCount:1},
        {name: 'cover', maxCount:1},
    ])
}

function saveImage(req, res){
    if(req.place){
        let files = ['avatar','cover']
        let promise = []

        files.forEach(type => {
            if(req.files && req.files[type]){
                const path = req.files[type][0].path;
                promise.push(req.place.updateImage(path, type))
            }
        })
        Promise.all(promise).then(result => {
            console.log(result)
            res.json(req.place)
        }).catch(err => {
            console.log(err)
            res.json(err)
        })
    }
    else {
        req.status(422).json({
            err: req.error || "Could not save place"
        })
    }
}

module.exports = {index, create, show, update, remove, find, multerMiddleware, saveImage}