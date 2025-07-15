const carritoGuardado = localStorage.getItem('carrito');
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
let listaProductos = [];

const mostrarProductos = document.getElementById('productContainer');
const modalCarrito = document.getElementById('modal-carrito');
const carritoItems = document.getElementById('carrito-items');
const totalCarrito = document.getElementById('total-carrito');
const cantidadCarrito = document.getElementById('cantidadCarrito');
const btnVerCarrito = document.getElementById('ver-carrito');
const btnCerrarModal = document.getElementById('cerrar-modal');
const btnCheckout = document.getElementById('btn-checkout');

async function cargarProductos() {
  try {
    const res = await fetch('productos.json');
    listaProductos = await res.json();
    renderizarProductos();
  } catch (err) {
    console.error('Error cargando productos:', err);
  }
}

function renderizarProductos() {
  mostrarProductos.innerHTML = '';
  listaProductos.forEach(p => {
    mostrarProductos.innerHTML += `
      <div class='cardProduct'>
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button class='btn' data-id='${p.id}'>Agregar al carrito</button>
      </div>
    `;
  });

  const botones = document.getElementsByClassName('btn');
for (let btn of botones) {
  btn.addEventListener('click', () => {
    const id = parseInt(btn.dataset.id);
    agregarAlCarrito(id);
  });
}

}

function agregarAlCarrito(id) {
  const producto = listaProductos.find(p => p.id === id);
  const item = carrito.find(i => i.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${producto.nombre} agregado`,
    showConfirmButton: false,
    timer: 1000
  });

  actualizarCarrito();
}

function mostrarCarrito() {
  carritoItems.innerHTML = '';

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${item.precio * item.cantidad}</span>
      <button data-id="${item.id}">&times;</button>
    `;
    carritoItems.appendChild(div);
  });

  const botones = carritoItems.getElementsByTagName('button');
for (let btn of botones) {
  btn.addEventListener('click', () => {
    const id = parseInt(btn.dataset.id);
    eliminarDelCarrito(id);
  });
}


  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalCarrito.textContent = total;
}

function actualizarCarrito() {
  cantidadCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  mostrarCarrito();
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

btnVerCarrito.addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire('El carrito está vacío');
    return;
  }
  modalCarrito.classList.remove('hidden');
  mostrarCarrito();
});

btnCerrarModal.addEventListener('click', () => {
  modalCarrito.classList.add('hidden');
});

btnCheckout.addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire('Tu carrito está vacío');
    return;
  }
  modalCarrito.classList.add('hidden');
  finalizarConDatos();
});


function finalizarConDatos() {
  Swal.fire({
    title: 'Finalizar compra',
    html:
      `<input id="nombre" class="swal2-input" placeholder="Nombre">` +
      `<input id="email" type="email" class="swal2-input" placeholder="Email">` +
      `<input id="direccion" class="swal2-input" placeholder="Dirección">`,
    confirmButtonText: 'Finalizar',
    preConfirm: () => {
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const direccion = document.getElementById('direccion').value;

      if (!nombre || !email || !direccion) {
        Swal.showValidationMessage('Por favor, completa todos los campos');
        return false;
      }
      return { nombre, email, direccion };
    }
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      actualizarCarrito();
      Swal.fire(
        'Gracias por tu compra',
        `Te enviaremos un mail a <b>${result.value.email}</b>`,
        'success'
      );
    }
  });
}


cargarProductos();
