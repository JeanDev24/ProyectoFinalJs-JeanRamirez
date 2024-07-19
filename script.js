document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');

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
    }

    function actualizarTotal(precio) {
        const totalActual = parseFloat(total.textContent);
        total.textContent = (totalActual + precio).toFixed(2);
    }
});