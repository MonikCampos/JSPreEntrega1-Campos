let carrito = [];
let total = 0;
let cuotas = 1;
let interes = 0;
let totalSinInteres = 0;

function seleccionarProducto(nombre, precio) {
    let producto = {
        nombre: nombre,
        precio: precio,
        cuotas: cuotas,
        interes: interes,
        subtotal: precio,
    };
    carrito.push(producto);
    total += precio;
    mostrarResumen();
}

function aplicarCuotas() {
    totalSinInteres = total;
    cuotas = prompt("Ingrese la cantidad de cuotas:");
    interes = prompt("Ingrese el interés (%):");
    let intereses = total * (interes / 100);
    total += intereses;
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        producto.cuotas = cuotas;
        producto.interes = interes;
        let porcentajeDelTotal = producto.subtotal / total;
        producto.subtotal = producto.precio + (porcentajeDelTotal * intereses);
    }
    mostrarResumen();
}

function limpiarResumen() {
    carrito = [];
    total = 0;
    cuotas = 1;
    interes = 0;
    totalSinInteres = 0;
    mostrarResumen();
}

function mostrarResumen() {
    let listaResumen = document.getElementById("resumen");
    listaResumen.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        let li = document.createElement("li");
        // li.innerHTML = producto.nombre + ': $' + producto.precio.toFixed(2) + ' (' + producto.cuotas + ' cuotas al ' + producto.interes + '%)';
        li.innerHTML = producto.nombre + ': $' + producto.precio.toFixed(2);
        listaResumen.appendChild(li);
    }
    document.getElementById("totalSinInteres").innerHTML = totalSinInteres;
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("cuotas").innerHTML = cuotas;
    document.getElementById("interes").innerHTML = interes;
}