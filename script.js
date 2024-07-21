document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    const pokemonNombre = document.getElementById('pokemon-nombre');
    const pokemonImagen = document.getElementById('pokemon-imagen');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    function agregarAlCarrito(event) {
        const postre = event.target.parentElement;
        const nombre = postre.querySelector('h2').textContent;
        const precio = parseFloat(postre.getAttribute('data-precio'));

        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${nombre} - $${precio.toFixed(2)}`;
        listaCarrito.appendChild(itemCarrito);

        actualizarTotal(precio);
        obtenerPokemon();
    }

    function actualizarTotal(precio) {
        const totalActual = parseFloat(total.textContent);
        total.textContent = (totalActual + precio).toFixed(2);
    }

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
});
