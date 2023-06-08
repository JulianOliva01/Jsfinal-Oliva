let carritoVisible = false;

document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready();


function ready() {
    let botonEliminaItems = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonEliminaItems.length; i++) {
        let botton = botonEliminaItems[i];
        botton.addEventListener('click', eliminarItemCarro);
    }

    //funcionalidad al boton +

    let btnSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < btnSumarCantidad.length; i++) {
        let button = btnSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //funcionalidad al boton -

    let btnRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < btnRestarCantidad.length; i++) {
        let button = btnRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //funcionalidad a los botones de las cards
    let btnAgregarCarro = document.getElementsByClassName('añadir-carro');
    for (let i = 0; i < btnAgregarCarro.length; i++) {
        let button = btnAgregarCarro[i];
        button.addEventListener('click', agregarAlCarro);
    }
}

function eliminarItemCarro(evento) {
    let buttonClicked = evento.target;
    buttonClicked.parentElement.remove();

    actualizarPrecioCarro()

}

function actualizarPrecioCarro() {
    let carroContendor = document.getElementById('carro')[0];
    let itemsCarro = document.getElementsByClassName('item-carro');
    let total = 0;

    for (let i = 0; i < itemsCarro.length; i++) {
        let item = itemsCarro[i];
        let precioDelElemento = document.getElementsByClassName('precio-item-carro')[0];
        console.log(precioDelElemento);

        let precio = parseFloat(precioDelElemento.innerText.replace('$', '').replace('.', ''));
        // console.log(precio);
        let cantidadItem = document.getElementsByClassName('item-cantidad-carro')[0];
        let cantidad = cantidadItem.value;
        // console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('precio-total-carro')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('item-cantidad-carro')[0].value;
    // console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('item-cantidad-carro')[0].value = cantidadActual;
    actualizarPrecioCarro();
}

function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('item-cantidad-carro')[0].value;
    // console.log(cantidadActual);
    cantidadActual--;
    if (cantidadActual >= 0) {
        selector.getElementsByClassName('item-cantidad-carro')[0].value = cantidadActual;
        actualizarPrecioCarro();
    }
}

function agregarAlCarro(event) {
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-carta')[0].innerText;
    let precio = item.getElementsByClassName('precio-carta')[0].innerText;
    let imgSrc = item.getElementsByClassName('img-item')[0].src;

    //funcion que manda los objetos al carro
    agregarItemAlCarro(titulo, precio, imgSrc);
}

function agregarItemAlCarro(titulo, precio, imgSrc) {
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('titulo-item-carro');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            swal.fire({
                title: 'Este producto ya fue agregado'
            })
            return;
        }
    }
    let itemContenidoCarrito = `
    <div class="item-carro">
    <img src="${imgSrc}" alt="" width="80px">
    <div class="detalles-item-carro">
      <span class="titulo-item-carro">Short Chichago Bulls</span>
      <div class="seleccion-cantidad">
        <i class="bi bi-cart-dash-fill restar-cantidad"></i>
        <input type="text" value="2" class="item-cantidad-carro" disabled>
        <i class="sumar-cantidad bi bi-cart-plus-fill "></i>
      </div>
      <span class="precio-item-carro">${precio}</span>
    </div>
    <span class="btn-eliminar">
      <i class="bi bi-trash"></i>
    </span>
  </div>
  `
    item.innerHTML = itemContenidoCarrito;
    itemsCarrito.append(item)
}

