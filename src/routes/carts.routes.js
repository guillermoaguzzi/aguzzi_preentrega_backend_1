import { Router } from 'express';


const router = Router();

const carts = [
  {
    "id": 1,
    "products": [
      {
        "id": 3,
        "quantity": 1
      },
      {
        "id": 5,
        "quantity": 4
      },
      {
        "id": 7,
        "quantity": 3
      }
    ]
  },
  {
    "id": 7,
    "products": [
      {
        "id": 4,
        "quantity": 5
      },
      {
        "id": 6,
        "quantity": 9
      }
    ]
  }
];

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


router.get('/', (req, res) => {
  res.send(carts);
});


// "(...)  La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados (...)" (consignas.txt:33)
router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cartById = carts.find((cart) => cart.id == cid);
  if (cartById) return res.json(cartById.products);
  res.status(404).json({ error: "Cart not found" });
});



// "(...)  La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura (...)" (consignas.txt:29)
router.post("/", (req, res) => {
  const { products = [] } = req.body;
  const ids = carts.map(cart => cart.id);
  const id = Math.max(...ids) + 1;
  const cartProducts = products.map(({ id, quantity }) => ({ id, quantity }));
  const cart = { id, products: cartProducts };
  carts.push(cart);
  res.status(201).json(cart);
});


// "(...)  La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado (...)" (consignas.txt:35)
router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cartById = carts.find((cart) => cart.id == cid);
  if (cartById) {
    const productById = products.find((product) => product.id == pid);
    if (productById) {
      const { id } = productById;
      // "(...)  product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (...) (...)   quantity: debe contener el número de ejemplares de dicho producto (...)" (consignas.txt:36:37)
      const productNew = { id, quantity };
      const productExist = cartById.products.find((product) => product.id == id);
      // "(...)  si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto (...)" (consignas.txt:39)
      if (productExist) {
      productExist.quantity = productExist.quantity + productNew.quantity
      return res.status(201).json(cartById);
      }else{
      cartById.products.push(productNew);
      return res.status(201).json(cartById);}
    }
  }
  res.status(404).json({ error: "Cart or Product not found" });
});



export default router;

