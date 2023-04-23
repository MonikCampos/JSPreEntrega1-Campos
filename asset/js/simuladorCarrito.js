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
    totalSinInteres = totalConIva;
}

function aplicarCuotas() {
    totalSinInteres = totalConIva;
    cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
    interes = parseInt(prompt("Ingrese el interés (%):"));
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

function mostrarResumen() {
    let listaResumen = document.getElementById("resumen");
    listaResumen.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        let li = document.createElement("li");
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

function limpiarCompra() {
    carrito = [];
    total = 0;
    cuotas = 1;
    interes = 0;
    totalSinInteres = 0;
    totalConInteres = 0;
    totalConIva = 0;
    cadaCuota = 0;
    empleadoID = 0;
    empleadoNombre = "";
    mostrarResumen();
}

function mostrarEmpleado(nombre) {
    document.getElementById("empleadoNombre").innerHTML = nombre;
}

function seleccionarEmpleado() {
    let nroEmpleado = parseInt(prompt("Seleccione el empleado:\n 1- José Rodriguez \n 2-María Gutierrez \n 3-Martín Fernandez \n 4-Laura Garcia"));
    switch (nroEmpleado) {
        case 1:
            empleadoID = nroEmpleado;
            empleadoNombre = "José Rodriguez"
            mostrarEmpleado(empleadoNombre);
            break;
        case 2:
            empleadoID = nroEmpleado;
            empleadoNombre = "María Gutierrez"
            mostrarEmpleado(empleadoNombre);
            break;
        case 3:
            empleadoID = nroEmpleado;
            empleadoNombre = "Martín Fernandez"
            mostrarEmpleado(empleadoNombre);
            break;
        case 4:
            empleadoID = nroEmpleado;
            empleadoNombre = "Laura Garcia"
            mostrarEmpleado(empleadoNombre);
            break;
        default:
            alert("No existe el empleado, ingrese la opción nuevamente");
            break;
    }
}

function enviarFacturacion() {
    let respuesta;
    if (total === 0) {
        alert("Debe seleccionar por lo menos un producto para vender");
    } else {
        if (empleadoID === 0) {
            alert("Debe seleccionar un empleado para facturar");
        } else {
            respuesta = prompt("Confirmar Venta S/N:");
            if (respuesta === "S" || respuesta === "s") {
                let factura = {
                    // utilizaría este objeto para enviar/imprimir la factura
                    //ahora se muestrará solo en un alert
                    fecha: new Date(),
                    empleadoID: empleadoID,
                    empleadoNombre: empleadoNombre,
                    carrito: carrito,
                    totalConIva: totalConIva,
                    totalSinInteres: totalSinInteres,
                    cuotas: cuotas,
                    interes: interes,
                    totalConIntereses: totalConIntereses
                };
                let FacturaEncabezado = "";
                let FacturaCuerpo = "";
                let FacturaPie = "";
                let nroFactura = parseInt(getRandomArbitrary(1000000, 9999999));
                FacturaEncabezado = `Factura Nro ${nroFactura} \nFecha ${factura.fecha} \nEmpleado: ${factura.empleadoNombre}\n\n`;
                let cuerpo;
                for (let i = 0; i < carrito.length; i++) {
                    cuerpo = carrito[i].nombre + ': $' + carrito[i].precio.toFixed(2);
                    FacturaCuerpo = FacturaCuerpo + cuerpo + '\n';
                }
                if (factura.cuotas === 1) {
                    FacturaPie = `\n Total: ${factura.totalConIva}`;
                } else {
                    FacturaPie = `\n Total: ${factura.totalConIntereses} - ${factura.cuotas} cuotas al ${factura.interes}% de interés`;
                }
                alert(FacturaEncabezado + FacturaCuerpo + FacturaPie);
            } else {
                alert("Venta cancelada");
            }
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}