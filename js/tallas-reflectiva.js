let tallaElegida = "";
const modal = document.getElementById('miModal');

// Función para abrir el modal recibiendo DOS imágenes
function abrirModal(titulo, img1, img2, stock, listaTallas) {
    // 1. Inyectar datos e imágenes
    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalImagen1').src = img1;
    document.getElementById('modalImagen2').src = img2;
    document.getElementById('maxStock').innerText = stock;
    
    // 2. Generar botones de Tallas dinámicamente
    const contenedorTallas = document.getElementById('contenedorTallas');
    contenedorTallas.innerHTML = ''; 

    listaTallas.forEach(talla => {
        const btn = document.createElement('button');
        btn.innerText = talla.nombre;
        btn.className = 'talla-btn border-2 border-gray-300 rounded-md px-4 py-2 hover:border-primary-blue transition-all font-bold';
        
        if (!talla.disponible) {
            btn.classList.add('opacity-30', 'cursor-not-allowed', 'bg-gray-100');
            btn.disabled = true;
        } else {
            btn.onclick = function() { seleccionarTalla(this); };
        }
        contenedorTallas.appendChild(btn);
    });

    // 3. Cantidad
    const selector = document.getElementById('selectorCantidad');
    selector.innerHTML = '';
    for (let i = 1; i <= stock; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = i;
        selector.appendChild(opt);
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    tallaElegida = "";
    document.querySelectorAll('.talla-btn').forEach(btn => {
        btn.classList.remove('bg-primary-blue', 'text-white', 'border-primary-blue');
    });
}

function seleccionarTalla(elemento) {
    document.querySelectorAll('.talla-btn').forEach(btn => {
        btn.classList.remove('bg-primary-blue', 'text-white', 'border-primary-blue');
    });
    elemento.classList.add('bg-primary-blue', 'text-white', 'border-primary-blue');
    tallaElegida = elemento.innerText;
}

function agregarAlCarrito() {
    const cantidad = document.getElementById('selectorCantidad').value;
    const titulo = document.getElementById('modalTitulo').innerText;
    const imagenParaCarrito = document.getElementById('modalImagen1').src; // Guardamos la prenda
    const precio = 45000; 

    if (tallaElegida === "") {
        alert("⚠️ Por favor, selecciona una talla antes de agregar.");
        return;
    }

    const producto = {
        id: Date.now(),
        nombre: titulo,
        talla: tallaElegida,
        cantidad: parseInt(cantidad),
        precio: precio,
        imagen: imagenParaCarrito
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert("✅ ¡Producto añadido con éxito!");
    cerrarModal();
}

// Cerrar al hacer clic fuera
window.onclick = function(event) {
    if (event.target == modal) { cerrarModal(); }
}