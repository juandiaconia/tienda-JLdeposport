            // CÓDIGO JAVASCRIPT: EL MOTOR DEL CARRUSEL
        document.addEventListener('DOMContentLoaded', () => {
            // Selecciona todos los contenedores de carrusel en la página
            const carousels = document.querySelectorAll('.carousel');

            carousels.forEach(carousel => {
                const imagesContainer = carousel.querySelector('.carousel-images');
                // Obtiene la lista de todas las imágenes dentro del contenedor
                const images = imagesContainer.querySelectorAll('img');
                const prevButton = carousel.querySelector('.prev');
                const nextButton = carousel.querySelector('.next');
                
                // Índice de la imagen que se está mostrando actualmente (0 es la primera)
                let currentIndex = 0;
                // Número total de imágenes
                const totalImages = images.length;
                // Ancho de una sola imagen (100% del contenedor)
                const imageWidth = 100; 

                /**
                 * Actualiza la posición del contenedor de imágenes para mostrar
                 * la imagen en el currentIndex, usando transform: translateX.
                 */
                function updateCarousel() {
                    // Calcula el desplazamiento horizontal necesario. 
                    const offset = -currentIndex * imageWidth;
                    imagesContainer.style.transform = `translateX(${offset}%)`;
                }

                /**
                 * Mueve el carrusel a la imagen anterior.
                 */
                function showPrev() {
                    // Si ya estamos en la primera imagen (0), vamos a la última (totalImages - 1)
                    currentIndex = (currentIndex === 0) ?
                                (totalImages - 1) :
                                (currentIndex - 1);
                    updateCarousel();
                }

                /**
                 * Mueve el carrusel a la imagen siguiente.
                 */
                function showNext() {
                    // Módulo para hacer un bucle: si es la última, vuelve a 0.
                    currentIndex = (currentIndex + 1) % totalImages;
                    updateCarousel();
                }

                // --- 1. Event Listeners ---
                prevButton.addEventListener('click', showPrev);
                nextButton.addEventListener('click', showNext);

                // --- 2. Autopass (setInterval) ---
                // Tu lógica original de setInterval, adaptada al nuevo método
                setInterval(showNext, 5000);

                // Inicializa el carrusel a la primera imagen
                updateCarousel();
            });
        });