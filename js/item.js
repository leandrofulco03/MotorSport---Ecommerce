class Item {
    constructor(id, tipo, nombre, precio, stock, imagen, cant = 0) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.cant = cant;
        
        this.getStock = function () {
            if (this.stock > 0) {
                this.stock--;
                return stock;
            } else {
                return false;
            }
        };
    }
}