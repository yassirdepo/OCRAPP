const mongoose = require('mongoose')

const Schema = mongoose.Schema

const factureSchema = Schema({
    nofacture:{
        type:Number,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    montant:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Facture',factureSchema)