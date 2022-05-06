const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
const products = require('./products')
import Contenedor from './desafio2'

const PORT = process.env.PORT || 8080


app.get('/', (req,res)=>{
    res.sendFile(
        path.join(__dirname+"/public/index.html")
    )
})

app.get('/productos', (req,res) =>{
    let productos = new Contenedor("productos.json")
    res.send({
        message: 'Todos los productos',
        data: productos.getAll()
    })
})



app.get('/productoRandom', (req, res) =>{
    let randomProduct = products.filter((x)=>{
        return x.id == Math.floor((Math.random() * 5) + 1);
    })
    console.log(randomProduct)
    res.send({
        message: 'Producto Random',
        data: randomProduct[0]
    })
})





app.listen (PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})
