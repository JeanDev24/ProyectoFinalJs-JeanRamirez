document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    const pokemonNombre = document.getElementById('pokemon-nombre');
    const pokemonImagen = document.getElementById('pokemon-imagen');

    class Postre {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
        }
    }

    class Carrito {
        constructor() {
            this.items = JSON.parse(localStorage.getItem('carrito')) || [];
            this.total = parseFloat(localStorage.getItem('total')) || 0;
            this.renderCarrito();
        }

        agregarItem(postre) {
            this.items.push(postre);
            this.actualizarTotal(postre.precio);
            this.mostrarItem(postre);
            this.guardarCarrito();
        }

        actualizarTotal(precio) {
            this.total += precio;
            total.textContent = this.total.toFixed(2);
            localStorage.setItem('total', this.total.toFixed(2));
        }

        mostrarItem(postre) {
            const itemCarrito = document.createElement('li');
            itemCarrito.textContent = `${postre.nombre} - $${postre.precio.toFixed(2)}`;
            listaCarrito.appendChild(itemCarrito);
        }

        renderCarrito() {
            listaCarrito.innerHTML = '';
            this.items.forEach(postre => this.mostrarItem(postre));
            total.textContent = this.total.toFixed(2);
        }

        guardarCarrito() {
            localStorage.setItem('carrito', JSON.stringify(this.items));
        }
    }

    const carrito = new Carrito();

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const postreElement = event.target.parentElement;
            const nombre = postreElement.querySelector('h2').textContent;
            const precio = parseFloat(postreElement.getAttribute('data-precio'));
            const postre = new Postre(nombre, precio);
            carrito.agregarItem(postre);
            obtenerPokemon();
            obtenerDatosConAxios(); // Llamada a la nueva función con Axios
        });
    });

    function obtenerPokemon() {
        const randomId = Math.floor(Math.random() * 151) + 1; // Genera un ID aleatorio entre 1 y 151
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
            .then(response => response.json())
            .then(data => {
                pokemonNombre.textContent = data.name;
                pokemonImagen.src = data.sprites.front_default;
            })
            .catch(error => console.error('Error al obtener el Pokémon:', error));
    }

    function obtenerDatosConAxios() {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                console.log('Datos obtenidos con Axios:', response.data);
            })
            .catch(error => console.error('Error al obtener datos con Axios:', error));
    }
});


