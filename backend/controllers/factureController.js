const Facture = require('../models/factureModel')
const mongoose = require('mongoose')
const multer = require('multer')

//get all
const getFactures = async(req,res)=>{
    const factures = await Facture.find({}).sort({createdAt:-1})

    res.status(200).json(factures)
}



//get one
const getFacture = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such facture'})
    }

    const facture = await Facture.findById(id)

    if(!facture){
        return res.status(404).json({error:'No such facture'})
    }

    res.status(200).json(facture)
}



//upload one

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads")
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

const uploadFacture = async(req,res)=>{
    res.status(200)
}


//create one

const createFacture = async(req,res)=>{
    const {nofacture,adresse,montant,date}=req.body

    let emptyFields = []

    if (!nofacture) {
      emptyFields.push('nofacture')
    }
    if (!adresse) {
      emptyFields.push('adresse')
    }
    if (!montant) {
      emptyFields.push('montant')
    }
    if (!date) {
        emptyFields.push('date')
      }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Veuillez Remplir tout les Champs!', emptyFields })
    }

    //add doc to db
    try {
        const facture = await Facture.create({nofacture,adresse,montant,date})
        res.status(200).json(facture)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



//delete one


const deleteFacture = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such facture'})
    }

    const facture = await Facture.findOneAndDelete({_id:id})

    if(!facture){
        return res.status(404).json({error:'No such facture'})
    }

    res.status(200).json(facture)
}


//update one

const updateFacture = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such facture'})
    }

    const facture = await Facture.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!facture){
        return res.status(404).json({error:'No such facture'})
    }

    res.status(200).json(facture)
}




module.exports={
    getFactures,
    getFacture,
    createFacture,
    deleteFacture,
    updateFacture,
    uploadFacture,
    upload
}