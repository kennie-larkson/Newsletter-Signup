//jshint esversion : 6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const port = process.env.PORT || 3000




const app = express()

app.listen(port, ()=>{
    console.log(`Newsletter server running on port: ${port}`)
})
