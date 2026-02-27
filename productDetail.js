document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = products.find((p) => p.id == id);
  if (!product) return;

  // ===== SET PRODUCT DATA =====
  document.querySelector(".pro_img").src = product.image;
  document.querySelector(".product_info h1").textContent = product.name;
  document.querySelector(".pricing h4").textContent = "Rs. " + product.price;
  document.querySelector(".pricing s").textContent = "Rs. " + product.oldPrice;

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );
  document.querySelector(".pricing h5").textContent = "Sale " + discount + "%";

  // ===== QUANTITY =====
  const countInput = document.querySelector(".counter .count");
  document.querySelector(".counter .min")?.addEventListener("click", () => {
    countInput.value = Math.max(1, (parseInt(countInput.value) || 1) - 1);
  });

  document.querySelector(".counter .max")?.addEventListener("click", () => {
    countInput.value = (parseInt(countInput.value) || 1) + 1;
  });

  // ===== ADD TO CART =====
  document.querySelector(".add_crt")?.addEventListener("click", () => {
    const qty = parseInt(countInput?.value) || 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Added to Cart !!!");
  });
});
