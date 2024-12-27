import {
  cart, addToCart, removeFromCart, updateQuantity, updateSize, calculateCartPrice,
  findProductById, calculateCartSubTotalPrice, updateCartQuantity,
} from "/static/data/cart.js";
import { allProduct } from "/static/data/all-products.js";

function renderCart() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const matchingProduct = findProductById(cartItem.productId, allProduct);
    if (matchingProduct) {
      const discountStyle =
        matchingProduct.status === "" ? "display: none;" : "";

      cartSummaryHTML += `
        <div class="product-one product-one-container-js-${matchingProduct.productId}">
          <div class="product-image">
            <img src="${matchingProduct.productImage}">
          </div>
          <div class="product-details">
            <h2>${matchingProduct.productName}</h2>
            <div class="quantity">
              <p>Amount:</p>
              <button class="quantity-btn minus-btn" data-product-id="${matchingProduct.productId}">-</button>
              <input class="quantity-input" type="text" value="${cartItem.amount}" readonly>
              <button class="quantity-btn plus-btn" data-product-id="${matchingProduct.productId}">+</button>
            </div>
            <div class="size">
              <label for="size">Size:</label>
              <select name="size" class="size-select" data-product-id="${matchingProduct.productId}">
                <option value="4" ${cartItem.size === "4" ? "selected" : ""}>Size 4</option>
                <option value="5" ${cartItem.size === "5" ? "selected" : ""}>Size 5</option>
                <option value="6" ${cartItem.size === "6" ? "selected" : ""}>Size 6</option>
                <option value="7" ${cartItem.size === "7" ? "selected" : ""}>Size 7</option>
                <option value="8" ${cartItem.size === "8" ? "selected" : ""}>Size 8</option>
                <option value="9" ${cartItem.size === "9" ? "selected" : ""}>Size 9</option>
                <option value="10" ${cartItem.size === "10" ? "selected" : ""}>Size 10</option>
                <option value="11" ${cartItem.size === "11" ? "selected" : ""}>Size 11</option>
              </select>
            </div>
          </div>
          <div class="product-price">
            <div class="discount" style="${discountStyle}">
              <p class="discount-percentage">${matchingProduct.status}</p>
            </div>
            <div class="price">
              $ ${(parseFloat(
                matchingProduct.productPrice.replace("$", "").trim()
              ) * cartItem.amount).toFixed(2)}
            </div>
          </div>
          <div class="delete-logo js-delete-button" data-product-id=${matchingProduct.productId}>
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      `;
    }
  });

  document.querySelector(".order-summery-js").innerHTML = cartSummaryHTML;

  attachEventListeners();
  updateCartQuantity();

  const totalPrice = calculateCartPrice(allProduct);
  const subTotalPrice = calculateCartSubTotalPrice(allProduct);
  document.querySelector("#final-price").textContent = `$ ${totalPrice}`;
  document.querySelector(".subtotal-price").textContent = ` $ ${subTotalPrice}`;
}

function attachEventListeners() {
  document.querySelectorAll(".plus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      updateQuantity(productId, 1);
      renderCart();
    });
  });

  document.querySelectorAll(".minus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      updateQuantity(productId, -1);
      renderCart();
    });
  });

  document.querySelectorAll(".size-select").forEach((select) => {
    select.addEventListener("change", () => {
      const productId = select.dataset.productId;
      const selectedSize = select.value;
      updateSize(productId, selectedSize);
    });
  });

  document.querySelectorAll(".js-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      renderCart();
    });
  });
}

renderCart();
