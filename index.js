const express = require('express')
const app = express()
app.use(express.json())
const products = require('./products')

const PORT = process.env.PORT || 8080


app.get('/', (req,res)=>{
    res.send(
        '<h1>Productos Apple</h1>'
    )
})

app.get('/productos', (req,res) =>{
    res.send({
        message: 'Información recibida',
        data: products
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
