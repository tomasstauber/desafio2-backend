import express from "express";
import productManager from "./productManager.js"

const app = express();
app.use(express.urlencoded({ extended: true }))

const productos = new productManager();
const consultaProd = productos.consultaProd();

app.get("/productos", async (req, res) => {
    let limite = parseInt(req.query.limite);
    if(!limite) return res.send(await consultaProd);
    let todosLosProductos = await consultaProd;
    let limiteProductos = todosLosProductos.slice(0, limite);
    res.send(limiteProductos)
})

app.get("/productos/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let todosLosProductos = await consultaProd;
    let productosId = todosLosProductos.find(producto => producto.id === id);
    res.send(productosId)
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`localHost: ${server.address().port}`)
})

server.on('error', (error) => {
    console.log(`error en el servidor ${error}`)
})