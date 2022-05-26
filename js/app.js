// Seleccionar los elementos
let cart = document.querySelector('.cart-popup');
let addToCart = document.querySelector('.add-to-cart');
let removeElement = document.querySelector('.remove');
let total = document.getElementById("total");
let items = document.querySelector('.card-productos');
let buttons = document.getElementsByClassName('button');
let itemBtn = document.querySelector('.item-btn');

// Declarar el array productos
const productosArr = [];
// Pushear los datos de los productos al array
productosArr.push(new Item(0, "Neumatico", "185/65 R15 TC101 - TRIANGLE", 22000, 20, "img/1-TC101-m.jpg"));
productosArr.push(new Item(1, "Aceite", "QUARTZ 7000 10W40 DIESEL 4L", 5000, 30, "img/aceite-quartz7000.jpg"));
productosArr.push(new Item(2, "Bateria", "MOURA BATERIA 75 AMP MI26AD", 20400, 23, "img/bateriamoura.jpg"));
// JSON
const peticion = async () => {
    const resp = await
    fetch('./js/data.json');
    const data = await resp.json();
    for (let i = 0; i < data.length; i++) {
        productosArr.push(new Item(data[i].id, data[i].tipo, data[i].nombre, data[i].precio, data[i].stock, data[i].imagen));
    }
// Recorremos el array y mostramos los productos
    productosArr.forEach(productosArr => {
        items.innerHTML += `<div class="card col-9 col-lg-3 col-md-6 col-sm-12 col-xs-12 mx-5 m-3" style="width: 25rem;">
        <img src="${productosArr.imagen}" class="card-img-top" alt="${productosArr.nombre}">
        <div class="card-body">
            <h5 class="card-title">${productosArr.nombre}</h5>
            <p class ="card-text">${productosArr.tipo}</p> 
            <h5 class="card-text">$${productosArr.precio}</h5>
            <label>Cantidad</label>
            <p class="card-text">Quedan ${productosArr.stock} disponibles</p>
            <a href="#"><button type="submit" class="button btn btn-primary">Comprar</button></a>
        </div>
        </div>`;
    });
// Se crea la funcion comprar la cual itera sobre los productos 
    const comprar = () => { 
        for (let i = 0; i < productosArr.length; i++) {
        buttons[i].addEventListener("click", (e) => {
            e.preventDefault();
            // Se agraga una notificacion para que el usuario vea lo que esta por comprar
            Toastify({
                        text: `Añadiendo "${productosArr[i].tipo} ${productosArr[i].nombre}" al Carrito + $${productosArr[i].precio}`,
                        className: "info",
                        newWindow: true,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                          background: "linear-gradient(to right, #000, #c3c3c3)",
                          color: "#fff"
                        }
                      }).showToast();
                      // Elimino las etiquetas del html cuando se agrega un producto
                      removeElement.remove();
                      addToCart.innerHTML += `<div class="d-flex align-items-center p-1">
                                                    <img src="${productosArr[i].imagen}" style="width: 6rem;">
                                                    <div class="d-flex flex-column align-items-center">
                                                    <h6>${productosArr[i].nombre} $${productosArr[i].precio}</h6>
                                                    <i class="borrar-producto fa-solid fa-xmark"></i>
                                                    </div>
                                                </div>`;

            carrito.addProducto(productosArr[i]);
        });
    }    
    }
    comprar();
}
peticion();

// Se crea el carrito
let carrito = new Carrito();
// LocalStorage
function guardar_localStorage() {
    if (localStorage.carritoDeCompras == undefined) {
    carrito;
} else {
    carritoInfo = JSON.parse(localStorage.carritoDeCompras);
    carrito = new Carrito(carritoInfo.nombre, carritoInfo.items, carritoInfo.total);
    actualizar();
}
}

function actualizar() {
    total.textContent = `Total: $${carrito.precioTotal()}`;
    localStorage.carritoDeCompras = JSON.stringify(carrito);
}

guardar_localStorage();

// MENU ITEM
itemBtn.addEventListener('click', () => {
    document.querySelector('.cart-popup').classList.toggle('show');
});






