const express = require('express')
const {
    getFactures,
    getFacture,
    createFacture,
    deleteFacture,
    updateFacture
} = require('../controllers/factureController')

const router = express.Router()


//GET all factures
router.get('/',getFactures)

//GET a single facture
router.get('/:id',getFacture)

//POST a new facture
router.post('/',createFacture)


//DELETE a new facture
router.delete('/:id',deleteFacture)


//UPDATE a facture
router.patch('/:id',updateFacture)

module.exports = router