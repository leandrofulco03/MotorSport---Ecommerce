function Carrito (nombre = "Usuario", items = [], total = 0) {
    this.nombre = nombre;
    this.items = items;
    this.total = total;

    this.addProducto = function (item) {
        if (item.getStock()) {
            if (this.items[item.id] == undefined) {
                this.items[item.id] = item;
            }
            this.items[item.id].cant++;
        } else {
            Toastify({
                text: "No hay más disponibilidad de " + item.tipo + " " + item.nombre,
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
        }
        actualizar();
    };
    this.precioTotal = function () {
        let totalIt = 0;
        for (item of this.items) {
            if (item != undefined) {
                totalIt += item.precio * item.cant;
            }
        }
        this.total = totalIt;
        return totalIt;
    };
}