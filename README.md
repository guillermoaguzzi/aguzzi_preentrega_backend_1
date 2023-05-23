PRUEBAS A REALIZAR:

PRODUCTS:

1. Método GET:


1.1. http://localhost:8080/api/products

Devolverá la lista completa de productos


1.2. http://localhost:8080/api/products?limit=2

Devolverá únicamente los 2 primeros productos de la lista




GET/:pid

1.3. http://localhost:8080/api/products/3

Devolverá únicamente el producto al cual corresponda el id número 3


1.4. http://localhost:8080/api/products/7
devolverá el mensaje " "error": "Product not found" "





2. Método POST:


2.1. http://localhost:8080/api/products

declarar el siguiente objeto en postman:

{
    "title": "Fender Korean Standard Stratocaster Guitar",
    "description": "Asian Manufactured version of our best selling guitar",
    "code": "FKSS7593",
    "price": 900,
    "status": true,
    "stock": 15,
    "category": "Electric Guitar"
}

devolverá el producto creado, incluido su id autogenerado. Se podrá corroborar su adhesion al archivo "products.json" mediante Método GET o GET/:pid





3. Método PUT:


3.1. http://localhost:8080/api/products/1

declarar el siguiente objeto en postman:

{
    "title": "Fender Korean Standard Stratocaster Guitar",
    "price": 900
}

Devolverá el producto con id número 1, con las propiedades ingresadas actualizadas, pero permaneciendo el resto de sus propiedades preexistentes. Se podrá corroborar su modificación en el archivo "products.json" mediante Método GET o GET/:pid


3.2. http://localhost:8080/api/products/1

declarar el siguiente objeto en postman:

{
    "title": "Fender Korean Standard Stratocaster Guitar",
    "price": 900,
    "color": "Red"
}

devolverá el mensaje " "error": "\"color\" is not allowed" "





4. Método DELETE:

4.1. http://localhost:8080/api/products/1

Devolverá Status 204. Se podrá corroborar su modificación en el archivo "products.json" mediante Método GET o GET/:pid (devolverá error al no encontrar el producto)






CARTS:

5. Método GET/:pid


5.1. http://localhost:8080/api/carts/1

Devolverá únicamente el carrito al cual corresponda el id número 1





6. Método POST:


6.1. http://localhost:8080/api/carts


devolverá el carrito creado, incluido su id autogenerado. Se podrá corroborar su adhesion al archivo "products.json" mediante Método GET o GET/:pid




7. Método POST/:cid/product/:pid



7.1 http://localhost:8080/api/carts/3/product/2 (ejecutar posrterior a 6.1)

declarar el siguiente objeto en postman:

{
    "quantity": 5
}

Devolverá el carrito con id numero 3, con el producto con id numero 2 agregado junto a su propiedad "quantity". Se podrá corroborar su adhesion al archivo "carts.json" mediante Método GET o GET/:pid



7.2 http://localhost:8080/api/carts/2/product/2

declarar el siguiente objeto en postman:

{
    "quantity": 5
}

Devolverá el carrito con id numero 2 completo, con la propiedad "quantity" perteneciente al  producto con id numero 2 modificada. Se podrá corroborar su adhesion al archivo "carts.json" mediante Método GET o GET/:pid




7.3 http://localhost:8080/api/carts/4/product/2

declarar el siguiente objeto en postman:

{
    "quantity": 5
}

Al no existir el carrito con id numero 4, devolverá el error " "error": "Cart or Product not found" "




7.3 http://localhost:8080/api/carts/2/product/8

declarar el siguiente objeto en postman:

{
    "quantity": 5
}

Al no existir el producto con id numero 8, devolverá el error " "error": "Cart or Product not found" "