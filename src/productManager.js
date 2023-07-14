import { promises as fs} from "fs";

class productManager {
    constructor() {
        this.path = "./productos.txt"
        this.productos = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        productManager.id++;

        let nuevoProducto = {
            id: productManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.productos.push(nuevoProducto);

        await fs.writeFile(this.path, JSON.stringify(this.productos));
    }

    consultaProd = async () => {
        let res = await fs.readFile(this.path, "utf-8");
        return JSON.parse(res)
    }

    getProductos = async () => {
        let resProds = await this.consultaProd();
        return console.log(resProds)
    }

    getProductosById = async (id) => {
        let resProdsId = await this.consultaProd();
        if (!resProdsId.find(productos => productos.id === id)) {
            console.log("[ERROR] product not found")
        } else {
            console.log(resProdsId.find(productos => productos.id === id))
        }
    }

    deleteProductosById = async (id) => {
        let resProds = await this.consultaProd();
        let filtroDelete = resProds.filter(productos => productos.id != id);
        await fs.writeFile(this.path, JSON.stringify(filtroDelete));
        console.log("prod eliminado exitosamente")
    }

    actualizadorProductos = async ({ id, ...producto }) => {
        await this.deleteProductosById(id);
        let productoAnterior = await this.consultaProd();
        let productoModificado = [{ id, ...producto }, ...productoAnterior];
        await fs.writeFile(this.path, JSON.stringify(productoModificado));
    }
}

const productos = new productManager;

productos.addProduct("ProductoA", "DescripciónA", 500, "sin imagen", "aaa111", 10);
productos.addProduct("ProductoB", "DescripcionB", 1000, "sin imagen", "aaa222", 20);
productos.addProduct("ProductoC", "DescripcionC", 2000, "sin imagen", "aaa333", 40);
productos.addProduct("ProductoD", "DescripcionD", 3000, "sin imagen", "aaa444", 60);
productos.addProduct("ProductoE", "DescripcionE", 5000, "sin imagen", "aaa666", 80);
productos.addProduct("ProductoF", "DescripcionF", 4000, "sin imagen", "aaa555", 100);
productos.addProduct("ProductoG", "DescripcionG", 6000, "sin imagen", "aaa777", 120);
productos.addProduct("ProductoH", "DescripcionH", 7000, "sin imagen", "aaa888", 140);
productos.addProduct("ProductoI", "DescripcionI", 8000, "sin imagen", "aaa999", 160);


//productos.getProductos();

//productos.getProductosById(7);

//productos.deleteProductosById(2);

/* productos.actualizadorProductos({
    id: 3,
    title: 'ProductoC',
    description: 'DescripcionC',
    price: 3500,
    thumbnail: 'sin imagen',
    code: 'aaa333',
    stock: 40
}); */

export default productManager;