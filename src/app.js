import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// "(...) disponga de dos grupos de rutas: /products y /carts (...) (consignas:3)"
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



app.listen(8080, () => {
    console.log("Server is listening on port 8080");
})




