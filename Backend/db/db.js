const mongoose = require('mongoose')

function connectToDb(){

    mongoose.connect(process.env.DB_CONNECT).then((result) => {
     console.log("Connected to Db")   
    }).catch((err) => {
        console.log(err,"error connecting to db ")
    });
}

module.exports = connectToDb