
const productos = ["Auricular", "Reloj", "Cargador"];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("productos");
const carritoTotal = document.getElementById("carrito-total");
const listaCarrito = document.getElementById("lista-carrito");
const btnVaciar = document.getElementById("vaciar-carrito");

function mostrarProductos() {
  productos.forEach(producto => {
    const btn = document.createElement("button");
    btn.textContent = `Agregar ${producto}`;
    btn.addEventListener("click", () => agregarAlCarrito(producto));
    contenedorProductos.appendChild(btn);
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  guardarCarrito();
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  carritoTotal.textContent = `Tenés ${carrito.length} productos en tu carrito.`;

  listaCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    item.textContent = producto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarProducto(index));

    item.appendChild(btnEliminar);
    listaCarrito.appendChild(item);
  });
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarritoUI();
}

btnVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarritoUI();
});

mostrarProductos();
actualizarCarritoUI();
