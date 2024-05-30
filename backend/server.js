require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const factureRoutes = require('./routes/factures')


//express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})

//routes
app.use('/api/factures',factureRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listening
        app.listen(process.env.PORT,()=>{
            console.log('listening on',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error);
    })