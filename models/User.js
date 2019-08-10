const mongoose = require('mongoose')
const mongooseBcrypt = require('mongoose-bcrypt')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    nombre: String,
    admin: {
        type: Boolean,
        defaul: false,
    },

    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }

});

userSchema.post('save', (user, next) => {
   User.count({}).then(count => {
       if(count == 1){
           User.update({'_id':user._id}, {admin:true}).then(result => {
               next();
           })
       }
       else{
           next(new Error('Not Admin'))
       }
   })
})
userSchema.plugin(mongooseBcrypt)
const User = mongoose.model('User', userSchema)

module.exports = User;