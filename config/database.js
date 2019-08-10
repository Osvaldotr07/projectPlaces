const mongoose  = require('mongoose')
const dbName = 'place_db_facilito'
module.exports = {
      connect: () => mongoose.connect('mongodb://localhost:27017/' + dbName, {useNewUrlParser: true}),
      dbName: dbName,
      connection: () => {
            if(mongose.connection){
                  return mongoose.connection
            }

            return this.connect();
      }
       
}