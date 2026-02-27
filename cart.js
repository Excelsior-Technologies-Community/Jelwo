document.addEventListener("DOMContentLoaded", () => {
  const countEls = document.querySelectorAll(".cart-count");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartTableBody = document.getElementById("cartTableBody");
  const cartPageTotal = document.getElementById("cartPageTotal");
  const clearPageBtn = document.getElementById("clearCartPageBtn");
  const viewCartBtn = document.getElementById("viewCartBtn");

  // ===== STORAGE =====
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
  const formatRs = (v) => "Rs. " + (Number(v) || 0);

  // ===== MAIN RENDER =====
  function renderCart() {
    const cart = getCart();

    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    countEls.forEach((el) => (el.textContent = `(${totalQty})`));

    renderOffcanvas(cart, totalPrice);
    renderTable(cart, totalPrice);
  }

  // ===== OFFCANVAS =====
  function renderOffcanvas(cart, total) {
    if (!cartItemsEl || !cartTotalEl) return;

    if (!cart.length) {
      cartItemsEl.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
      cartTotalEl.textContent = "Rs. 0";
      return;
    }

    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="d-flex align-items-center gap-3 mb-3">
        <img src="${item.image}" style="width:56px;height:56px;object-fit:cover;">
        <div class="flex-grow-1">
          <div class="fw-semibold">${item.name}</div>
          <div class="text-muted small">${item.color}</div>
          <div class="text-muted">${item.quantity} x ${formatRs(item.price)}</div>
          <div class="d-flex gap-2 mt-1">
            <button data-dec="${item.id}" class="btn btn-sm btn-outline-secondary">-</button>
            <span>${item.quantity}</span>
            <button data-inc="${item.id}" class="btn btn-sm btn-outline-secondary">+</button>
          </div>
        </div>
        <button data-remove="${item.id}" class="btn btn-link text-danger p-0">Remove</button>
      </div>
    `,
      )
      .join("");

    cartTotalEl.textContent = formatRs(total);
  }

  // ===== TABLE =====
  function renderTable(cart, total) {
    if (!cartTableBody || !cartPageTotal) return;

    if (!cart.length) {
      cartTableBody.innerHTML =
        '<tr><td colspan="5" class="text-center text-muted py-4">Your cart is empty.</td></tr>';
      cartPageTotal.textContent = "Rs. 0";
      return;
    }

    cartTableBody.innerHTML = cart
      .map(
        (item) => `
      <tr>
        <td>
          <div class="product-cell">
            <img src="${item.image}">
            <div>
              <div class="fw-semibold">${item.name}</div>
              <div class="small text-muted">color :- ${item.color}</div>
              <div class="small text-muted">category :- ${item.category || ""}</div>
            </div>
          </div>
        </td>
        <td class="text-center">
          <button data-dec="${item.id}" class="btn btn-sm btn-outline-secondary">-</button>
          ${item.quantity}
          <button data-inc="${item.id}" class="btn btn-sm btn-outline-secondary">+</button>
        </td>
        <td class="text-end">${formatRs(item.price)}</td>
        <td class="text-end">
          <button data-remove="${item.id}" class="btn btn-link text-danger p-0">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `,
      )
      .join("");

    cartPageTotal.textContent = formatRs(total);
  }

  // ===== UPDATE CART =====
  function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);
    setCart(cart);
    renderCart();
  }

  function removeItem(id) {
    setCart(getCart().filter((i) => i.id !== id));
    renderCart();
  }

  // ===== CLICK HANDLING (ONE LISTENER) =====
  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const remove = e.target.closest("[data-remove]");

    if (inc) return changeQty(+inc.dataset.inc, 1);
    if (dec) return changeQty(+dec.dataset.dec, -1);
    if (remove) return removeItem(+remove.dataset.remove);
  });

  // ===== CLEAR CART =====
  clearPageBtn?.addEventListener("click", () => {
    setCart([]);
    renderCart();
  });

  // ===== VIEW CART =====
  viewCartBtn?.addEventListener("click", () => {
    window.location.href = "./cart.html";
  });

  // ===== GLOBAL CART OBJECT =====
  window.Cart = {
    add(product, qty = 1) {
      const cart = getCart();
      const existing = cart.find((i) => i.id === product.id);

      existing
        ? (existing.quantity += qty)
        : cart.push({ ...product, quantity: Math.max(1, +qty) });

      setCart(cart);
      renderCart();
    },
    render: renderCart,
  };

  renderCart();
});
