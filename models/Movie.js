const mongoose = require("mongoose")
const Schema = mongoose.Schema

 const Movie = new Schema({} , {strict: false})


module.exports =  mongoose.model("movies" , Movie);