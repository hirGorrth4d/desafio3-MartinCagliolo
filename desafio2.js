const fs = require('fs');
export default class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
        this.count = 1
        this.product = []
        this.bloqueo = false
        fs.writeFileSync(`./${this.nombre}`, '[')
    }

    save(obj) {
        if (this.bloqueo) {
            console.log('Esperando un segundo');
            setTimeout(() => this.save(obj), 1000)
        } else {
            console.log('Agregando...', this.count)
            this.bloqueo = true;
            obj['id'] = this.count;
            let paraAgregar = JSON.stringify(obj, null, 2);
            if (this.count > 1) paraAgregar = ', ' + paraAgregar
            fs.appendFile(`./${this.nombre}`, paraAgregar, 'utf-8', (err) => {
                if (err) {
                    console.log("Error al crear archivo")
                } else {
                    this.product.push(obj)
                    this.count++;
                    console.log("Archivo agregado")
                }
                this.bloqueo = false;
            })
        }
    }

    completo() {
        if (this.bloqueo) {
            console.log('Esperando un segundo')
            setTimeout(() => this.completo(), 1000)
        } else {
            this.bloqueo = true;
            fs.appendFileSync(`./${this.nombre}`, ']', 'utf-8', (err) => {
                if (err) {
                    console.log("Error al crear archivo")
                }
                this.bloqueo = false;
            })
        }
    }

    getByID(id){
        fs.readFile(`./${this.nombre}`, 'utf-8', (err, data) =>{
            if (err){
                console.log("Error al leer")
            } else {
                return JSON.parse(data).filter( x => x.id == id)
            }

        } ) 
    }

    getAll(){
        fs.readFile(`./${this.nombre}`, 'utf-8', (err) =>{
            if (err){
                console.log("Error al leer")
            } else {
                let productos = this.product
                return productos.map(x => x)
            }
            this.bloqueo = false
        } ) 
    }
    deleteByID(id){
        fs.unlink(`./${this.nombre}`, 'utf-8', (err, data) =>{
            if (err){
                console.log("Error al leer")
            } else {
                let product = JSON.parse(data).map( x => {
                    return x.id == id
                })
                console.log(product)
            }
            this.bloqueo = false
        } ) 
    }
    deleteAll(){
        fs.readFile(`./${this.nombre}`, 'utf-8', (err, data) =>{
            if (err){
                console.log("Error al leer")
            } else {
                return JSON.parse(data) = []
            }
        } ) 
    }
}

let archivos = new Contenedor('text.json')

archivos.save(
        {
            title: 'Escuadra',
            price: 152.50,
            thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seawhite.co.uk%2Fimagecache%2F6d084f72-7747-4b0c-a432-095215a06d70_749x440.jpg&f=1&nofb=1'
        }
)
archivos.save(
        {
            title: 'Calculadora',
            price: 350,
            thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.EQEUEEePk2MVRTJzJ9i_DwHaHa%26pid%3DApi&f=1'
        }
)
archivos.save(
        {
            title: 'Globo Terraqueo',
            price: 500,
            thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bOZqswPe_toRzfCa4xvV4gHaHa%26pid%3DApi&f=1'
        }
)
archivos.save(
    {
        title: 'Globo Terraqueo',
        price: 500,
        thumbnail: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bOZqswPe_toRzfCa4xvV4gHaHa%26pid%3DApi&f=1'
    }
)

archivos.completo();

console.log(archivos.getAll())

// archivos.deleteAll()