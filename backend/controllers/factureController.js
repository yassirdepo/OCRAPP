const Facture = require('../models/factureModel')
const mongoose = require('mongoose')

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



//create one

const createFacture = async(req,res)=>{
    const {nofacture,adresse,montant,date}=req.body

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
    updateFacture
}