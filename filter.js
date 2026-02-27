//for Product page :-
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".collectionSection");
  const sortBy = document.getElementById("sortBy");

  const catInputs = document.querySelectorAll(".cat");
  const priceRanges = document.querySelectorAll(".priceRange");
  const priceValues = document.querySelectorAll(".priceValue");
  const colorInputs = document.querySelectorAll(".color");
  const clearDesktop = document.getElementById("clearFiltersDesktop");
  const clearMobile = document.getElementById("clearFiltersMobile");

  const maxPrice = Number(priceRanges[0]?.max) || 5000;

  let filteredProducts = [...products]; // from your data.js

  // ======================
  // Render Products
  // ======================

  function renderProducts(productArray) {
    container.innerHTML = "";

    productArray.forEach((product) => {
      container.innerHTML += `
        <div class="product col-md-4">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top">
            <div class="card-body">
              <h5>${product.name}</h5>
              <p>₹ ${product.price}</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  // ======================
  // Apply Filters
  // ======================

  function applyFilters() {
    const selectedCats = [...document.querySelectorAll(".cat:checked")].map(
      (input) => input.value,
    );

    const selectedColors = [...document.querySelectorAll(".color:checked")].map(
      (input) => input.value,
    );

    const selectedPrice = Number(priceRanges[0]?.value) || maxPrice;

    priceValues.forEach((v) => (v.textContent = selectedPrice));
    priceRanges.forEach((r) => (r.value = selectedPrice));

    filteredProducts = products.filter((product) => {
      const matchCategory =
        selectedCats.length === 0 || selectedCats.includes(product.category);

      const matchColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);

      const matchPrice = product.price <= selectedPrice;

      return matchCategory && matchColor && matchPrice;
    });

    updateAppliedFilters(selectedCats, selectedColors, selectedPrice);

    renderProducts(filteredProducts);
  }

  //   =====updated filters=============
  function updateAppliedFilters(selectedCats, selectedColors, selectedPrice) {
    const appliedDesktop = document.getElementById("appliedFiltersDesktop");
    const appliedMobile = document.getElementById("appliedFiltersMobile");

    let filtersHTML = "";

    selectedCats.forEach((cat) => {
      filtersHTML += `<span class="applied_tag">${cat}</span>`;
    });

    selectedColors.forEach((color) => {
      filtersHTML += `<span class="applied_tag">${color}</span>`;
    });

    if (selectedPrice < maxPrice) {
      filtersHTML += `<span class="applied_tag">Under ₹${selectedPrice}</span>`;
    }

    appliedDesktop.innerHTML = filtersHTML;
    appliedMobile.innerHTML = filtersHTML;
  }

  // ======================
  // Sort
  // ======================

  function sortProducts() {
    const type = sortBy.value;

    if (type === "A-Z") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (type === "Z-A") {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderProducts(filteredProducts);
  }

  // ======================
  // Clear
  // ======================

  function clearFilters() {
    catInputs.forEach((input) => (input.checked = false));
    colorInputs.forEach((input) => (input.checked = false));

    priceRanges.forEach((r) => (r.value = maxPrice));
    priceValues.forEach((v) => (v.textContent = maxPrice));

    filteredProducts = [...products];

    document.getElementById("appliedFiltersDesktop").innerHTML = "";
    document.getElementById("appliedFiltersMobile").innerHTML = "";

    renderProducts(filteredProducts);
  }
  // ======================
  // Events
  // ======================

  document.addEventListener("change", function (e) {
    if (
      e.target.classList.contains("cat") ||
      e.target.classList.contains("color")
    ) {
      applyFilters();
    }
  });

  priceRanges.forEach((r) => r.addEventListener("input", applyFilters));

  sortBy.addEventListener("change", sortProducts);

  clearDesktop?.addEventListener("click", clearFilters);
  clearMobile?.addEventListener("click", clearFilters);

  // Initial Render
  renderProducts(products);
});
