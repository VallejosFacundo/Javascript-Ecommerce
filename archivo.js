const productos = ["Auricular", "Reloj", "Cargador"];
let carrito = [];

function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log(`Agregaste ${producto} al carrito.`);
}

function mostrarTotal() {
    let total = carrito.length;
    alert(`Tenes ${total} productos en tu carrito.`);
}

function ingresarProductos (){
    let continuar = true;
    while (continuar) {
        let producto = prompt ("Ingrese los productos que quiere agregar al carrito (Auricular, Reloj, Cargador) o 'Salir' para finalizar.");
    if (producto.toLowerCase() ==="salir"){
        continuar = false;
        alert ("Gracias por visitar, vuelva pronto");
    } else if (productos.map(p => p.toLowerCase()).includes(producto.toLowerCase())) {
        agregarAlCarrito(producto.charAt(0).toUpperCase() + producto.slice (1).toLowerCase());
        mostrarTotal();
    }  else {
        alert ("El producto no esta disponible, seleccione una de las opciones");
    }
  }
}


ingresarProductos ();