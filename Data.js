// const { colors } = require("@mui/material");

// ================= PRODUCT DATA =================
const products = [
  {
    id: 1,
    name: "Simple Pearl Earring",
    category: "earrings",
    price: 1500,
    color: "gold",
    oldPrice: 2000,
    image:
      "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-6.jpg?v=1742442751&width=352",
  },
  {
    id: 2,
    name: "Rose Gold Ring",
    color: "rose-gold",
    category: "rings",
    price: 2000,
    oldPrice: 2500,
    image:
      "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-56.jpg?v=1742445682&width=720",
  },
  {
    id: 3,
    name: "Jhumkas",
    color: "silver",
    category: "jhumkas",
    price: 2000,
    oldPrice: 2500,
    image:
      "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=720",
  },
];
// ================= MAIN LOGIC =================
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelectorAll(".collectionSection");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ===== DISPLAY PRODUCTS =====
  section.forEach((section) => {
    products.forEach((product) => {
      section.innerHTML += `
      <div class="coll_jwel">
        <figure class="snip1205 green">
          <img src="${product.image}" />
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-eye"></i>
          <a href="#"></a>

          <div class="countdown">
            <div><h3 class="day"></h3><span>DAY</span></div>
            <div><h3 class="hours"></h3><span>HRS</span></div>
            <div><h3 class="minutes"></h3><span>MIN</span></div>
            <div><h3 class="seconds"></h3><span>SEC</span></div>
          </div>
        </figure>

        <div class="info_pro">
          <div class="info">
            <p>${product.category}</p>
            <h5>${product.name}</h5>
            <h6 style="color:#a77f66">Rs. ${product.price}</h6>
            <s>Rs.${product.oldPrice}</s>
          </div>

          <div class="cart_opt_pro">
            <div class="cart_option">
              <select>
                <option>Gold</option>
                <option>Silver</option>
                <option>Rose-gold</option>
              </select>

              <div class="quantity">
                <button class="min">−</button>
                <input type="text" value="1" class="count" readonly />
                <button class="max">+</button>
              </div>
            </div>

            <button class="add_crt" data-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    });
  });

  // ===== CLOCK =====
  function updateClock() {
    const now = new Date();

    document.querySelectorAll(".coll_jwel").forEach((card) => {
      card.querySelector(".day").textContent = now.getDate();
      card.querySelector(".hours").textContent = now.getHours();
      card.querySelector(".minutes").textContent = now.getMinutes();
      card.querySelector(".seconds").textContent = now.getSeconds();
    });
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ===== QUANTITY BUTTONS =====
  document.querySelectorAll(".quantity").forEach((box) => {
    const minBtn = box.querySelector(".min");
    const maxBtn = box.querySelector(".max");
    const input = box.querySelector(".count");

    minBtn.addEventListener("click", () => {
      let value = parseInt(input.value);
      if (value > 1) input.value = value - 1;
    });

    maxBtn.addEventListener("click", () => {
      input.value = parseInt(input.value) + 1;
    });
  });

  // ===== ADD TO CART =====
  document.querySelectorAll(".add_crt").forEach((button) => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const card = this.closest(".coll_jwel");
      const qty = parseInt(card.querySelector(".count").value);

      const product = products.find((p) => p.id === id);
      const existing = cart.find((item) => item.id === id);

      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({ ...product, quantity: qty });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product Added to Cart !!!");
    });
  });
  // ===== REDIRECT TO PRODUCT DETAIL =====
  document.querySelectorAll(".coll_jwel").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (
        e.target.closest(".add_crt") ||
        e.target.closest(".quantity") ||
        e.target.closest("select")
      ) {
        return;
      }

      const id = parseInt(
        this.querySelector(".add_crt").getAttribute("data-id"),
      );

      window.location.href = `productDetail.html?id=${id}`;
    });
  });
});
