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
    category: "rings",
    color: "rose-gold",
    price: 2000,
    oldPrice: 2500,
    image:
      "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-56.jpg?v=1742445682&width=720",
  },
  {
    id: 3,
    name: "Jhumkas",
    category: "jhumkas",
    color: "silver",
    price: 2000,
    oldPrice: 2500,
    image:
      "https://jelwo.myshopify.com/cdn/shop/files/jewelry-product-51.jpg?v=1742445540&width=720",
  },
];

// ================= MAIN LOGIC =================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".collectionSection");

  // ===== DISPLAY PRODUCTS (Cleaner) =====
  const html = products
    .map(
      (p) => `
    <div class="coll_jwel">
      <figure class="snip1205 green">
        <img src="${p.image}" />
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
          <p>${p.category}</p>
          <h5>${p.name}</h5>
          <h6 style="color:#a77f66">Rs. ${p.price}</h6>
          <s>Rs.${p.oldPrice}</s>
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

          <button class="add_crt" data-id="${p.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  sections.forEach((sec) => (sec.innerHTML = html));

  // ===== CLOCK (Shorter) =====
  setInterval(() => {
    const now = new Date();
    document.querySelectorAll(".coll_jwel").forEach((card) => {
      card.querySelector(".day").textContent = now.getDate();
      card.querySelector(".hours").textContent = now.getHours();
      card.querySelector(".minutes").textContent = now.getMinutes();
      card.querySelector(".seconds").textContent = now.getSeconds();
    });
  }, 1000);

  // ===== ONE CLICK LISTENER (Cleaner Logic) =====
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".coll_jwel");
    if (!card) return;

    const input = card.querySelector(".count");

    // Quantity +
    if (e.target.classList.contains("max")) {
      input.value = +input.value + 1;
    }

    // Quantity -
    if (e.target.classList.contains("min")) {
      input.value = Math.max(1, +input.value - 1);
    }

    // Add to Cart
    if (e.target.classList.contains("add_crt")) {
      const id = +e.target.dataset.id;
      const qty = +input.value;
      const product = products.find((p) => p.id === id);

      if (window.Cart?.add) {
        window.Cart.add(product, qty);
        alert("Product Added to Cart !!!");
      }
    }

    // Redirect to detail page
    if (
      !e.target.closest(".add_crt") &&
      !e.target.closest(".quantity") &&
      !e.target.closest("select")
    ) {
      const id = +card.querySelector(".add_crt").dataset.id;
      window.location.href = `productDetail.html?id=${id}`;
    }
  });
});
