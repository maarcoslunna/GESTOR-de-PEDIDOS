let pedidos = [
    { id: 1, cliente: "Carlos Ruiz", talla: "L", pagadoEfectivo: true },
    { id: 2, cliente: "Ana Gómez", talla: "M", pagadoEfectivo: false }
];

const formulario = document.getElementById('formularioPedido');
const listaPedidos = document.getElementById('listaPedidos');
const resumenTallas = document.getElementById('resumenTallas');

function borrarPedido(idPedido) {
    pedidos = pedidos.filter(pedido => pedido.id !== idPedido);
    mostrarPedidos();
}

function mostrarPedidos() {
    listaPedidos.innerHTML = '';
    
    let contadorS = 0;
    let contadorM = 0;
    let contadorL = 0;
    let contadorXL = 0;

    for (let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i];
        
        if (pedido.talla === 'S') contadorS++;
        else if (pedido.talla === 'M') contadorM++;
        else if (pedido.talla === 'L') contadorL++;
        else if (pedido.talla === 'XL') contadorXL++;

        let elementoLi = document.createElement('li');
        
        let estadoPago = pedido.pagadoEfectivo ? "✅ Pagado" : "❌ Pendiente";
        
        let textoPedido = document.createElement('span');
        textoPedido.textContent = `${pedido.cliente} - Talla: ${pedido.talla} - ${estadoPago}`;
        
        let botonBorrar = document.createElement('button');
        botonBorrar.textContent = "Borrar";
        botonBorrar.className = "btn-borrar";
        botonBorrar.onclick = function() {
            borrarPedido(pedido.id);
        };

        elementoLi.appendChild(textoPedido);
        elementoLi.appendChild(botonBorrar);
        
        listaPedidos.appendChild(elementoLi);
    }
    
    resumenTallas.innerHTML = `
        <h3>Resumen de Tallas</h3>
        <div class="tallas-grid">
            <div><strong>S:</strong> ${contadorS}</div>
            <div><strong>M:</strong> ${contadorM}</div>
            <div><strong>L:</strong> ${contadorL}</div>
            <div><strong>XL:</strong> ${contadorXL}</div>
        </div>
    `;
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    let nombre = document.getElementById('nombreCliente').value;
    let talla = document.getElementById('tallaCamiseta').value;
    let pagado = document.getElementById('pagoEfectivo').checked;

    let nuevoPedido = {
        id: Date.now(), 
        cliente: nombre,
        talla: talla,
        pagadoEfectivo: pagado
    };

    pedidos.push(nuevoPedido);
    mostrarPedidos();
    formulario.reset();
});

mostrarPedidos();