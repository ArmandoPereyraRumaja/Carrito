const datos = {
  methods: {
    find: (id) => {
      return datos.items.find((item) => item.id === id);
    },
    remove: (items) => {
      items.forEach((item) => {
        const product = datos.methods.find(item.id);
        if (product) {
          product.cantidad = product.cantidad - item.cantidad;
        }
      });
    },
  },
  items: [
    { id: 0, descripcion: "Zapatillas", precio: 250, cantidad: 5 },
    { id: 1, descripcion: "Pelotas", precio: 345, cantidad: 50 },
    { id: 2, descripcion: "Buzos Hue", precio: 1300, cantidad: 80 },
    { id: 3, descripcion: "Gorras", precio: 50, cantidad: 30 },
    { id: 4, descripcion: "Mochilas", precio: 120, cantidad: 20 },
    { id: 5, descripcion: "Camisetas", precio: 90, cantidad: 40 },
    { id: 6, descripcion: "Short Deportivo", precio: 60, cantidad: 25 },
    { id: 7, descripcion: "Medias Deportivas", precio: 15, cantidad: 100 },
    { id: 8, descripcion: "Reloj Deportivo", precio: 450, cantidad: 15 },
  ],
};

const carrocompras = {
  items: [],
  methods: {
    add: (id, cantidad) => {
      const cartItem = carrocompras.methods.get(id);
      const cantidadActual = cartItem ? cartItem.cantidad : 0;

      if (carrocompras.methods.hasInventory(id, cantidadActual + cantidad)) {
        if (cartItem) {
          cartItem.cantidad += cantidad;
        } else {
          carrocompras.items.push({ id, cantidad });
        }
      } else {
        Swal.fire("No hay más inventario");
      }
    },
    remove: (id) => {
      const cartItem = carrocompras.methods.get(id);
      if (!cartItem) return;

      if (cartItem.cantidad - 1 > 0) {
        cartItem.cantidad--;
      } else {
        carrocompras.items = carrocompras.items.filter(
          (item) => item.id !== id
        );
      }
    },
    count: () => {
      return carrocompras.items.reduce((acc, item) => acc + item.cantidad, 0);
    },
    get: (id) => {
      const index = carrocompras.items.findIndex((item) => item.id === id);
      return index >= 0 ? carrocompras.items[index] : null;
    },
    getTotal: () => {
      let total = 0;
      carrocompras.items.forEach((item) => {
        const found = datos.methods.find(item.id);
        if (found) {
          total += found.precio * item.cantidad;
        }
      });
      return total;
    },
    hasInventory: (id, cantidad) => {
      const itemData = datos.items.find((item) => item.id === id);
      return itemData ? itemData.cantidad - cantidad >= 0 : false;
    },
    purchase: () => {
      // Guardar copia del estado del carrito antes de vaciarlo
      const itemsComprados = [...carrocompras.items];
      const totalFinal = carrocompras.methods.getTotal();

      // Descontar inventario global y vaciar carrito
      datos.methods.remove(carrocompras.items);
      carrocompras.items = [];

      // Construcción del resumen utilizando nodos del DOM (Cero HTML en JS)
      const container = document.createElement("div");
      container.style.textAlign = "left";

      const subHeader = document.createElement("p");
      subHeader.style.fontWeight = "bold";
      subHeader.textContent = "Detalle de los productos adquiridos:";
      container.appendChild(subHeader);

      itemsComprados.forEach((cartItem) => {
        const productoInfo = datos.methods.find(cartItem.id);
        const p = document.createElement("p");
        p.textContent = `• ${productoInfo.descripcion}: ${cartItem.cantidad} unidades (Subtotal: ${numberToCurrency(cartItem.cantidad * productoInfo.precio)})`;
        container.appendChild(p);
      });

      const totalP = document.createElement("p");
      totalP.style.fontWeight = "bold";
      totalP.style.marginTop = "15px";
      totalP.style.fontSize = "1.1rem";
      totalP.textContent = `Total de la Compra: ${numberToCurrency(totalFinal)}`;
      container.appendChild(totalP);

      Swal.fire({
        title: "¡Compra realizada con éxito!",
        html: container,
        icon: "success",
        confirmButtonText: "Aceptar"
      });

      actualizarInventarioVisual();
      rendercarrocompras();
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".item-card .add").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      carrocompras.methods.add(id, 1);
      rendercarrocompras();
    });
  });

  const cartToggle = document.getElementById("cart-toggle");
  if (cartToggle) {
    cartToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const cart = document.querySelector("#shopping-cart-container");
      if (cart.classList.contains("hide")) {
        cart.classList.remove("hide");
        cart.classList.add("show");
      } else {
        cart.classList.remove("show");
        cart.classList.add("hide");
      }
    });
  }

  const cartContainer = document.querySelector("#shopping-cart-container");
  cartContainer.style.position = "fixed";
  cartContainer.style.top = "70px";
  cartContainer.style.right = "20px";
  cartContainer.style.zIndex = "999";
  cartContainer.style.maxHeight = "80vh";
  cartContainer.style.overflowY = "auto";
  cartContainer.style.backgroundColor = "#fff";

  document.querySelector("#bClose").addEventListener("click", () => {
    document.querySelector("#shopping-cart-container").classList.remove("show");
    document.querySelector("#shopping-cart-container").classList.add("hide");
  });
});

function actualizarInventarioVisual() {
  datos.items.forEach((item) => {
    const el = document.querySelector(`[data-product-id="${item.id}"]`);
    if (el) {
      el.textContent = `${item.cantidad} unidades`;
    }
  });
}

function rendercarrocompras() {
  const cartItemsList = document.querySelector("#cart-items-list");
  cartItemsList.innerHTML = "";

  carrocompras.items.forEach((item) => {
    const datosItem = datos.methods.find(item.id);

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const descDiv = document.createElement("div");
    descDiv.className = "descripcion";
    descDiv.textContent = datosItem.descripcion;

    const precioDiv = document.createElement("div");
    precioDiv.className = "precio";
    precioDiv.textContent = numberToCurrency(datosItem.precio);

    const cantidadDiv = document.createElement("div");
    cantidadDiv.className = "cantidad";
    cantidadDiv.textContent = `${item.cantidad} unidades`;

    const subtotalDiv = document.createElement("div");
    subtotalDiv.className = "subtotal";
    subtotalDiv.textContent = `Subtotal: ${numberToCurrency(item.cantidad * datosItem.precio)}`;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const btnAddOne = document.createElement("button");
    btnAddOne.textContent = "+";
    btnAddOne.addEventListener("click", () => {
      carrocompras.methods.add(datosItem.id, 1);
      rendercarrocompras();
    });

    const btnRemoveOne = document.createElement("button");
    btnRemoveOne.textContent = "-";
    btnRemoveOne.addEventListener("click", () => {
      carrocompras.methods.remove(datosItem.id);
      rendercarrocompras();
    });

    actionsDiv.appendChild(btnAddOne);
    actionsDiv.appendChild(btnRemoveOne);

    itemDiv.appendChild(descDiv);
    itemDiv.appendChild(precioDiv);
    itemDiv.appendChild(cantidadDiv);
    itemDiv.appendChild(subtotalDiv);
    itemDiv.appendChild(actionsDiv);

    cartItemsList.appendChild(itemDiv);
  });

  const total = carrocompras.methods.getTotal();
  document.querySelector("#cart-total").textContent = `Total: ${numberToCurrency(total)}`;

  const actionsContainer = document.querySelector("#cart-actions-container");
  actionsContainer.innerHTML = "";

  if (carrocompras.items.length > 0) {
    const btnPurchase = document.createElement("button");
    btnPurchase.id = "bPurchase";
    btnPurchase.className = "btn green";
    btnPurchase.style.width = "100%";
    btnPurchase.textContent = "Terminar compra";

    btnPurchase.addEventListener("click", () => {
      carrocompras.methods.purchase();
    });

    actionsContainer.appendChild(btnPurchase);
  }
}

function numberToCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
