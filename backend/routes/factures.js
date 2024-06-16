const express = require('express')
const cors = require('cors')

const {
    getFactures,
    getFacture,
    createFacture,
    deleteFacture,
    updateFacture,
    uploadFacture,
    upload
} = require('../controllers/factureController')

const router = express.Router()
router.use(cors())

//GET all factures
router.get('/',getFactures)

//GET a single facture
router.get('/:id',getFacture)


//UPLOAD a new one

router.post('/upload',upload.single('file'),uploadFacture)


//POST a new facture
router.post('/',createFacture)


//DELETE a new facture
router.delete('/:id',deleteFacture)


//UPDATE a facture
router.patch('/:id',updateFacture)


module.exports = router