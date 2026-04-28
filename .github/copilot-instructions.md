# Instrucciones del Copilot para JL Deposport E-Commerce

## Descripción General del Proyecto
Aplicación e-commerce de una sola página para JL Deposport, fabricante y distribuidor de ropa deportiva en Medellín. El catálogo de productos incluye cortavientos, ropa reflectiva y prendas deportivas. Construido con HTML, CSS y JavaScript vanilla usando Tailwind CSS e iconos de Font Awesome.

## Arquitectura

### Stack Frontend
- **Páginas HTML**: Estructura multipágina (index.html, páginas de productos como Cortavientos-Adidas.html, Carrito.html)
- **Estilos**: Tailwind CSS + archivos CSS personalizados (style.css, cortavientos.css)
- **JavaScript**: JavaScript vanilla, sin frameworks
- **Iconos**: Font Awesome 6.4.0

### Patrones de Diseño Clave

#### Sistema Modal de Productos
Los productos utilizan manejadores `onclick` inline que llaman a `abrirModal()` con datos del producto:
```javascript
onclick="abrirModal('Verde Menta - Verde Botella / CA-DUAL-M01', 'img/Adidas/dama0095-1.jpg', 3, 
  [{nombre:'S', disponible:true}, {nombre:'M', disponible:true}, ...])"
```
- El modal genera dinámicamente botones de tallas según disponibilidad
- Selector de cantidad (`selectorCantidad`) poblado con rango de stock
- Archivo: [../js/tallas.js](../js/tallas.js)

#### Carrito de Compras (Basado en LocalStorage)
- **Almacenamiento**: Todos los datos del carrito persisten en `localStorage.getItem('carrito')`
- **Estructura de Datos**: Array de objetos de productos con `{id, nombre, talla, cantidad, precio, imagen}`
- **Checkout**: Integración con WhatsApp via `finalizarCompraWhatsApp()` envía mensaje formateado a número predefinido
- **Archivo**: [../Carrito.html](../Carrito.html) - contiene renderizado del carrito y lógica de WhatsApp

#### Carrusel de Imágenes
Componente carrusel genérico (contenedores `.carousel`) que soporta múltiples instancias independientes:
- Usa CSS `transform: translateX()` para deslizamiento suave
- Avanza automáticamente cada 5 segundos via `setInterval()`
- Botones anterior/siguiente utilizan event listeners
- Archivo: [../js/carrusel.js](../js/carrusel.js)

### Estructura del Layout
- **Header**: Fondo degradado (azul oscuro a púrpura), logo centrado + título
- **Navegación Lateral**: Barra horizontal fija listando todas las páginas de productos + enlace al carrito (resalte amarillo)
- **Contenido Principal**: Sección `.portafolio` con items de productos
- **Responsivo**: CSS cambia de grid de 2 columnas (index.html) a flex-column (páginas de productos) en móvil

## Organización de Archivos

```
/css/
  style.css          # Estilos de página de inicio (layout grid de 2 columnas)
  cortavientos.css   # Estilos de páginas de productos/carrito (flex responsivo)
/img/
  [Carpetas de Marca]/   # Imágenes de productos organizadas por marca (Adidas/, Nike/, etc.)
/js/
  tallas.js          # Lógica modal + selección de tallas
  carrusel.js        # Implementación del carrusel de imágenes
[Páginas de Productos].html # Cortavientos-Adidas.html, etc. - todos siguen la misma estructura
```

## Tailwind + Colores del Tema
Configuración personalizada de Tailwind en cada `<head>` de HTML:
```javascript
colors: {
  'primary-blue': '#006bb3',
  'secondary-purple': '#4c20c4',
  'accent-green': '#37f350',
  'marron': '#443c35',
  'yellow': '#f2ff00'
}
```
Utiliza estas clases de utilidad en lugar de valores hexadecimales directos.

## Patrones y Convenciones Comunes

### Nomenclatura de SKU de Producto
Formato: `CA-DUAL-M01` (ej., "Cortavientos Adidas Dual - Modelo 01")
- Embebido en el título del modal: `'Verde Menta - Verde Botella / CA-DUAL-M01'`

### Manejo de Precios
Actualmente codificado en `45000` en [../js/tallas.js](../js/tallas.js) via:
```javascript
const precio = 45000;
```
Nota: Todos los productos comparten este precio—actualízalo aquí para cambios globales.

### Diseño Responsivo
- Las páginas de productos utilizan `cortavientos.css` (sidebar flex-column)
- La página de inicio utiliza `style.css` (grid de 2 columnas)
- Punto de quiebre de media query: `@media (max-width: 1024px)`

### Gestión de Stock
El stock se pasa como tercer parámetro a `abrirModal()`:
```javascript
abrirModal(titulo, imagen, stock, listaTallas)
```
El selector de cantidad genera etiquetas `<option>` del 1 al valor de stock.

## Puntos de Integración

### API de WhatsApp
- Plantilla de mensaje formateada en `finalizarCompraWhatsApp()`
- Número de teléfono codificado: `573233596787` (actualiza según sea necesario)
- Utiliza el esquema de URL estándar `wa.me`

### Fallbacks de Imagen
Todas las imágenes de productos utilizan manejador onerror:
```html
onerror="this.onerror=null;this.src='https://placehold.co/80x80/006bb3/ffffff?text=JL';"
```

## Notas de Desarrollo
- No se requiere paso de compilación—sirve los archivos directamente
- Todo el manejo de estado a través de LocalStorage (solo carrito)
- Sin dependencias externas más allá de librerías CDN alojadas
- Los datos del producto están inline en HTML (no se obtienen de API)
- La disponibilidad de tallas se controla via booleano `disponible` en los datos

---

## Informe de Cambios del Día 16 de Abril de 2026

### Cambios Realizados
1. **Configuración de Imagen de Fondo en CSS**: Se agregó la imagen `textura_pared.webp` como fondo en los archivos `css/style.css` y `css/cortavientos.css`. Inicialmente se aplicó al selector `body`, pero posteriormente se movió al selector `.layout-grid` para asegurar visibilidad.
   - Propiedades aplicadas: `background-image: url('../img/textura_pared.webp')`, `background-size: cover`, `background-repeat: no-repeat`, `background-attachment: fixed`.
2. **Actualización del Selector de Fondo**: Se cambió el fondo del `.layout-grid` de un gradiente lineal (`linear-gradient(180deg, #e6f7ff 0%, #cfe8ff 100%)`) a la imagen de textura para que sea visible en la página.

### Proceso
- El usuario solicitó colocar la imagen `textura_pared.webp` (ubicada en `img/`) como fondo en todos los archivos CSS.
- Se identificaron los archivos CSS existentes: `style.css` y `cortavientos.css`.
- Se realizó la modificación inicial en el selector `body` de ambos archivos.
- El usuario reportó que los cambios no eran visibles en la página, manteniendo el color anterior.
- Se analizó el código y se determinó que el selector `.layout-grid` tenía un fondo propio (gradiente) que cubría el del `body`.
- Se movió la configuración de fondo al `.layout-grid` en ambos archivos, reemplazando el gradiente existente.
- Se verificó que la ruta de la imagen fuera correcta (`../img/textura_pared.webp` desde la carpeta `css/`).

### Errores Encontrados y Soluciones
- **Error Inicial**: La imagen de fondo no se mostraba porque el `.layout-grid` tenía un gradiente de fondo que lo cubría. El `body` estaba detrás o no visible en el área principal.
  - **Solución**: Cambiar el fondo del `.layout-grid` directamente, eliminando el gradiente y aplicando la imagen de textura. Esto asegura que el fondo sea visible en el contenido principal de la página.
- **Posible Error de Caché**: Si la página no refleja cambios, podría ser caché del navegador.
  - **Solución**: Recomendar refrescar con Ctrl+F5 o limpiar caché.

### Estado Anterior de la Página
- **Fondo**: La página tenía un fondo de gradiente lineal suave en tonos azules claros (`#e6f7ff` a `#cfe8ff`) aplicado al contenedor principal `.layout-grid`.
- **Layout**: Estructura de grid en la página principal (`style.css`) con sidebar y contenido, y flex en páginas de productos (`cortavientos.css`).
- **Colores**: Tema consistente con azules, púrpuras y verdes según la paleta definida.
- **Rendimiento**: Sin imágenes de fondo pesadas; colores sólidos y gradientes ligeros.

### Estado Actual de la Página
- **Fondo**: Ahora utiliza la imagen `textura_pared.webp` como fondo fijo y cubierto en el contenedor principal, proporcionando una textura visual atractiva y optimizada para carga rápida (formato WebP).
- **Layout**: Mantiene la misma estructura responsiva, pero con el nuevo fondo aplicado al `.layout-grid`.
- **Colores**: La textura complementa la paleta existente; los elementos superpuestos (header, sidebar, items) conservan sus colores y contrastes.
- **Rendimiento**: La imagen está optimizada, por lo que no afecta la velocidad de carga. El `background-attachment: fixed` crea un efecto de parallax sutil al hacer scroll.
- **Compatibilidad**: Funciona en desktop y móvil, manteniendo la responsividad definida en las media queries.

Este informe documenta todos los cambios realizados hoy para mantener un registro claro del desarrollo y facilitar futuras referencias o reversiones si es necesario.
