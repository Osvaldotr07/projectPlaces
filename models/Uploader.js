const cloudinary = require('cloudinary')

const secrets = require('../config/secrets')

cloudinary.config(secrets.cloudinary)

module.exports = function(imagePath){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imagePath, function(result){
            if(result.secure_url) return resolve(result.secure_url)
            reject('Problem with cloudinary')
        })
    })      
}

