let tallaElegida = "";
const modal = document.getElementById('miModal');

// Función para abrir el modal inyectando los datos del producto clicado
function abrirModal(titulo, imagenDetalle, stock, listaTallas) {
    // 1. Inyectar datos básicos
    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalImagen').src = imagenDetalle;
    document.getElementById('maxStock').innerText = stock;
    
    // 2. Generar botones de Tallas dinámicamente
    const contenedorTallas = document.querySelector('#miModal .flex.gap-2');
    contenedorTallas.innerHTML = ''; // Limpiar tallas anteriores

    listaTallas.forEach(talla => {
        const btn = document.createElement('button');
        btn.innerText = talla.nombre;
        
        // Clases base
        btn.className = 'talla-btn border-2 border-gray-300 rounded-md px-4 py-2 hover:border-primary-blue transition-all';
        
        // Verificar si está disponible
        if (!talla.disponible) {
            btn.classList.add('opacity-40', 'cursor-not-allowed', 'bg-gray-100');
            btn.disabled = true;
        } else {
            btn.onclick = function() { seleccionarTalla(this); };
        }
        
        contenedorTallas.appendChild(btn);
    });

    // 3. Generar selector de cantidad
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
    document.body.style.overflow = 'auto'; // Habilita scroll
    tallaElegida = ""; // Reiniciamos talla
    // Limpiamos los botones de talla visualmente
    document.querySelectorAll('.talla-btn').forEach(btn => {
        btn.classList.remove('bg-primary-blue', 'text-white', 'border-primary-blue');
    });
}

function seleccionarTalla(elemento) {
    // Si el botón está deshabilitado, no hacer nada
    if (elemento.hasAttribute('disabled')) return;

    // Quitar color a todos los botones que NO estén deshabilitados
    document.querySelectorAll('.talla-btn:not([disabled])').forEach(btn => {
        btn.classList.remove('bg-primary-blue', 'text-white', 'border-primary-blue');
    });
    
    // Poner color al seleccionado
    elemento.classList.add('bg-primary-blue', 'text-white', 'border-primary-blue');
    tallaElegida = elemento.innerText;
}

function agregarAlCarrito() {
    const cantidad = document.getElementById('selectorCantidad').value;
    const titulo = document.getElementById('modalTitulo').innerText;
    const imagen = document.getElementById('modalImagen').src;
    const precio = 45000; 

    if (tallaElegida === "") {
        alert("⚠️ Por favor, selecciona una talla antes de agregar.");
        return;
    }

    // Creamos el objeto para el LocalStorage
    const producto = {
        id: Date.now(),
        nombre: titulo,
        talla: tallaElegida,
        cantidad: parseInt(cantidad),
        precio: precio,
        imagen: imagen
    };

    // Guardar en el carrito (LocalStorage)
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert("✅ ¡Producto añadido! Ya puedes verlo en tu carrito.");
    cerrarModal();
}

// Cerrar al hacer clic fuera del cuadro blanco
window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
}
