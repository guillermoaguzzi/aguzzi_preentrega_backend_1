import { Router } from 'express';
import Joi from 'joi';

const router = Router();

const products = [
    {
        "id": 1,
        "title": "Fender KOREAN Standard Stratocaster Guitar",
        "description": "The standard and most popular model in the market",
        "code": "29",
        "price": 1000,
        "status": true,
        "stock": 23,
        "category": "Electric Guitar",
    },
	{
		"id": 2,
		"brand": "Fender",
		"bodytipe": "Stratocaster",
		"color": "White",
		"price": 1000,
	},
	{
		"id": 3,
		"brand": "Fender",
		"bodytipe": "Telecaster",
		"color": "Black",
		"price": 1000,
	},
	{
		"id": 4,
		"brand": "Fender",
		"bodytipe": "Jazzmaster",
		"color": "Sunburst",
		"price": 1000,
	},
	{
		"id": 5,
		"brand": "Fender",
		"bodytipe": "Jaguar",
		"color": "Cherrybursdt",
		"price": 1000,
	},
	{
		"id": 6,
		"brand": "Fender",
		"bodytipe": "Mustang",
		"color": "Olive",
		"price": 1000,
	},
	{
		"id": 7,
		"brand": "Gibson",
		"bodytipe": "SG",
		"color": "Red",
		"price": 1000,
	},
	{
		"id": 8,
		"brand": "Gibson",
		"bodytipe": "Les Paul",
		"color": "Golden",
		"price": 1000,
	},
	{
		"id": 9,
		"brand": "Gibson",
		"bodytipe": "ES-335",
		"color": "Red",
		"price": 1000,
	},
	{
		"id": 10,
		"brand": "Gibson",
		"bodytipe": "Explorer",
		"color": "Black",
		"price": 1000,
	},
	{
		"id": 11,
		"brand": "Gibson",
		"bodytipe": "Flying V",
		"color": "White",
		"price": 1000,
	},
	{
		"id": 12,
		"brand": "Gibson",
		"bodytipe": "Firebird",
		"color": "White",
		"price": 1000,
	},
	{
		"id": 13,
		"brand": "PRS",
		"bodytipe": "Custom 24",
		"color": "Gray",
		"price": 1000,
	},
	{
		"id": 14,
		"brand": "PRS",
		"bodytipe": "Silver Sky",
		"color": "Light-Blue",
		"price": 1000,
	},
	{
		"id": 15,
		"brand": "Jackson",
		"bodytipe": "Soloist",
		"color": "Pink",
		"price": 1000,
	}
];

let counter = 0;


// "(...) La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior (...)" (consignas.txt:6)
router.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.send(limitedProducts);
    } else {
    res.send(products);
    }
});


// "(...) La ruta GET /:pid deberá traer sólo el producto con el id proporcionado  (...)" (consignas.txt:7)
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const productById = products.find((product) => product.id == pid);
    if (productById) return res.json(productById);
    res.status(404).json({ error: "Product not found" });
});


// "(...) Todos los campos son obligatorios, a excepción de thumbnails (...)"  (consignas.txt:20)
const schemaForPostMethod = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    code: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.boolean().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
	thumbnails: Joi.array().items(Joi.string()),
});


// "(...) La ruta raíz POST / deberá agregar un nuevo producto con los campos  (...)" (consignas.txt:9)
router.post("/", (req, res) => {
    const { error, value } = schemaForPostMethod.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const { title, description, code, price, status, stock, category, thumbnails } = value;
    // "(...) el id NO se manda desde body, se autogenera (...)" (consignas.txt:10)
    const ids = products.map(product => product.id);
	const id = Math.max(...ids) + 1;
    const productNew = { id, title, description, code, price, status, stock, category, thumbnails };
    products.push(productNew);
    res.status(201).json(productNew);
    }
});


const schemaPutMethod = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    code: Joi.string(),
    price: Joi.number(),
    status: Joi.boolean(),
    stock: Joi.number(),
    category: Joi.string(),
	thumbnails: Joi.array().items(Joi.string()),
});


// "(...) La ruta PUT /:pid deberá tomar un producto y actualizarlo  (...)" (consignas.txt:22)
router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const productUpdated = products.find((product) => product.id == pid);
    if (productUpdated) {
    const { error, value } = schemaPutMethod.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const { title, description, code, price, status, stock, category, thumbnails } = value;
        productUpdated.title = title;
        productUpdated.description = description;
        productUpdated.code = code;
        productUpdated.price = price;
        productUpdated.status = status;
        productUpdated.stock = stock;
        productUpdated.category = category;
        productUpdated.thumbnails = thumbnails;
        return res.json(productUpdated);
    }
    } else {
    res.status(404).json({ error: "Product not found" });
    }
});


// "(...) La ruta DELETE /:pid deberá eliminar el producto con el pid indicado  (...)" (consignas.txt:24)
router.delete("/:pid", (req, res) => {
	const { pid } = req.params;
	const productDeleted = products.find((product) => product.id == pid );
	if (productDeleted) {
		products.splice(products.indexOf(productDeleted), 1);
		return res.sendStatus(204);
	}
	res.status(404).json({ error: "Product not found" });
});


export default router;