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
