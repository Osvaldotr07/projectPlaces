const express = require('express')
const placeControllers = require('../controllers/PlacesControllers')

const router = express.Router();
//Rutas sin wildcard
router.route('/')
    .get(placeControllers.index)
    .post(placeControllers.multerMiddleware(), 
    placeControllers.create, 
    placeControllers.saveImage);
//rutas con wildcard
router.route('/:id')
    .put(placeControllers.find,placeControllers.update)
    //Busar lugar por id
    .get(placeControllers.find, placeControllers.show)
    //Eliminar lugares
    .delete(placeControllers.find, placeControllers.remove)

module.exports = router;