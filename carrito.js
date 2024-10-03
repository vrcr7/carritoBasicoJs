document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("iniciarCompra").addEventListener("click", comprar);
});

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Carrito {
  constructor() {
    this.items = []; // Lista para almacenar los productos añadidos al carrito
  }

  // Agrega un producto al carrito junto con la cantidad deseada
  agregar(producto, cantidad) {
    this.items.push({ producto, cantidad });
    alert(`${cantidad} ${producto.nombre}(s) añadido(s).`); // Mensaje de confirmación
  }

  // Calcula el total sumando los precios de cada producto por su cantidad
  total() {
    return this.items.reduce(
      (suma, item) => suma + item.producto.precio * item.cantidad,
      0
    );
  }

  // Muestra un resumen de los productos añadidos al carrito
  resumen() {
    return (
      this.items
        .map(
          (item) =>
            `${item.cantidad} x ${item.producto.nombre} ($${item.producto.precio} c/u)`
        )
        .join("\n") + `\nTotal: $${this.total()}`
    ); // Lista de productos y total
  }

  // Finaliza la compra mostrando un resumen y limpia el carrito
  finalizar() {
    if (this.items.length) {
      alert(`Resumen de compra:\n${this.resumen()}\nGracias por tu compra.`); // Muestra detalles de la compra
      this.items = []; // Vacía el carrito
    } else {
      alert("Tu carrito está vacío."); // Si no hay productos, avisa al usuario
    }
  }
}

// Lista de productos disponibles para que el usuario pueda elegir
const productos = [
  new Producto("Leche", 100),
  new Producto("Pan de Molde", 2000),
  new Producto("Queso", 1200),
  new Producto("Mermelada", 800),
  new Producto("Azúcar", 1300),
];

// Muestra la lista de productos disponibles
function mostrarProductos() {
  alert(
    "Productos disponibles:\n" +
      productos.map((p, i) => `${i + 1}. ${p.nombre} - $${p.precio}`).join("\n")
  ); // Genera la lista de productos
}

// Función principal que controla el flujo de compra
function comprar() {
  const carrito = new Carrito(); // Crea un nuevo carrito de compras
  let continuar = true;

  // agregar productos hasta que el usuario decida parar
  while (continuar) {
    mostrarProductos(); // Muestra el catálogo de productos
    const seleccion = parseInt(prompt("Número del producto a agregar:")); // El usuario selecciona un producto
    const producto = productos[seleccion - 1]; // Selecciona el producto en base al número ingresado

    // Si el producto es válido, solicita la cantidad y lo añade al carrito
    if (producto) {
      const cantidad = parseInt(prompt("Cantidad:")); // Solicita la cantidad de unidades
      carrito.agregar(producto, cantidad); // Agrega el producto al carrito
      continuar = confirm("¿Agregar otro producto?"); // Pregunta si quiere seguir comprando
    } else {
      alert("Selección inválida."); // Si el número no es válido, muestra un error
    }
  }

  carrito.finalizar(); // Finaliza la compra mostrando el resumen
}
