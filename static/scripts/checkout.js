import {
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  calculateCartPrice,
  findProductById,
  calculateCartSubTotalPrice
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
              <select name="size" id="size">
                <option value="4">Size 4</option>
                <option value="5">Size 5</option>
                <option value="6">Size 6</option>
                <option value="7">Size 7</option>
                <option value="8">Size 8</option>
                <option value="9">Size 9</option>
                <option value="10">Size 10</option>
                <option value="11">Size 11</option>
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


  document.querySelectorAll(".js-delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      renderCart();
    });
  });
}


renderCart();
