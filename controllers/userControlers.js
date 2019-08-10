const User = require('../models/User')
const buildParamas = require('./helpers').buildParamas;

const validParams = ['email', 'name', 'password']
function create(req, res, next){
    let params = buildParamas(validParams, req.body)

    User.create(params).then(user => {
        console.log(user)
        req.user = user
       // res.json(user)
        next();
    })
    .catch(error => {
        console.log(error)
        res.status(422).json({
            error
        })
    })
}

/*function destroyAll(req, res){
    User.remove({}).then(r => res.json({}))
}*/

module.exports =  {create}