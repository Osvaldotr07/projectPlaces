const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uploader = require('./Uploader')
const slugify = require('../plugins/slugify')

let placeSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    slug: {
        type:String,
        unique: true
    },
    description: String,
    acceptCreditCard: {
        type: Boolean,
        default: false
    },
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,

    adress: {
        type: String,
        unique: true,
    }
});

placeSchema.methods.updateImage = function(path, typeImage){
    uploader(path).then(secure_url => this.saveImageUrl(secure_url, typeImage))
};

placeSchema.methods.saveImageUrl = function(secure_url, typeImage){
    this[typeImage+'Image'] = secure_url;
    return this.save();
};
placeSchema.pre('save', function(next) {
    if(this.slug) return next();
    generateSlugAndContinue.call(this,0,next);
})

placeSchema.statics.valideSlugCount = function(slug) {
    return Place.count({slug:slug}).then(count => {
        if(count > 0) return false
        return true
    }).catch(err => {
        console.log(err)
    })
}

placeSchema.plugin(mongoosePaginate);
function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title)

    if(count != 0)
        this.slug = this.slug + "-"+count

    Place.valideSlugCount(this.slug).then(isValid => {
        if(!isValid)
            return generateSlugAndContinue.call(this,count+1, next)
        
        next()
    })

}
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;