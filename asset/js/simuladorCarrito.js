let carrito = [];
let total = 0;
let cuotas = 1;
let interes = 0;
const iva = 21;
let totalSinInteres = 0;
let totalConIva = 0;
let totalConIntereses = 0;
let cadaCuota = 0;
let empleadoID = 0;
let empleadoNombre = "";

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
    calcularIva(total, iva);
    mostrarResumen();
}

function calcularIva(totalSinIva, tasaIva) {
    let porcentajeIva = totalSinIva * (tasaIva / 100);
    totalConIva = total + porcentajeIva;
    totalSinInteres = totalConIva
    return {
        totalConIva
    };
}


function aplicarCuotas() {
    totalSinInteres = totalConIva;
    cuotas = prompt("Ingrese la cantidad de cuotas:");
    interes = prompt("Ingrese el interés (%):");
    let intereses = totalConIva * (interes / 100);
    totalConIntereses = totalConIva + intereses;
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        producto.cuotas = cuotas;
        producto.interes = interes;
        let porcentajeDelTotal = producto.subtotal / totalConIva;
        producto.subtotal = producto.precio + (porcentajeDelTotal * intereses);
    }
    cadaCuota = Math.round(totalConIntereses / cuotas);
    mostrarResumen();
}

function limpiarCompra() {
    carrito = [];
    total = 0;
    cuotas = 1;
    interes = 0;
    totalSinInteres = 0;
    totalConIva = 0;
    cadaCuota = 0;
    empleadoID = 0;
    empleadoNombre = "";
    mostrarResumen();
}

function enviarFacturacion() {
    let respuesta;
    respuesta = prompt("Confirmar Venta S/N:");
    if (respuesta === "S") {
        let factura = {
            // utilizaría estos datos para enviar la factura
            fecha: new Date(),
            total: total,
            cuotas: cuotas,
            interes: interes,
            totalSinInteres: totalSinInteres,
            totalConIva: totalConIva,
            carrito: carrito,
            empleadoID: empleadoID
        };
        mostrarFactura();
    } else {
        alert("Venta cancelada");
    }
}

function mostrarEmpleado (nombre) {
    document.getElementById("nombreEmpleado").innerHTML = nombre;
}

function seleccionarEmpleado() {
    let nroEmpleado = parseInt(prompt("Seleccione el empleado / 1- José Rodriguez / 2-María Gutierrez / 3-Martín Fernandez"));
    switch (nroEmpleado) {
        case 1: 
            empleadoID = nroEmpleado;
            mostrarEmpleado("José Rodriguez");
            break;
        case 2:
            empleadoID = nroEmpleado;
            mostrarEmpleado("María Gutierrez");
            break;
        case 3:
            empleadoID = nroEmpleado;
            mostrarEmpleado("Martín Fernandez");
            break;
        default:
            alert("No existe el empleado, ingrese la opción nuevamente");
            break;
    }
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
    document.getElementById("totalConIntereses").innerHTML = totalConIntereses;
    document.getElementById("totalConIva").innerHTML = totalConIva;
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("cuotas").innerHTML = cuotas;
    document.getElementById("cadaCuota").innerHTML = cadaCuota;
    document.getElementById("interes").innerHTML = interes;
}