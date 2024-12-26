import { cart, removeFromCart } from "/static/data/cart.js";
import { allProduct } from "/static/data/all-products.js";

let cartSummaryHTML = "";

// Helper function to find a product by ID in all categories
function findProductById(productId) {
  let matchingProduct;

  // Search in 'men' category
  allProduct.men.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });

  // Search in 'women'
  if (!matchingProduct) {
    allProduct.women.forEach((product) => {
      if (product.productId === productId) {
        matchingProduct = product;
      }
    });
  }

  // Search in 'sales'
  if (!matchingProduct) {
    allProduct.sales.forEach((product) => {
      if (product.productId === productId) {
        matchingProduct = product;
      }
    });
  }

  return matchingProduct;
}

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const matchingProduct = findProductById(productId);

  if (matchingProduct) {

    // determine the `discount`
    const discountStyle =
      matchingProduct.status === ""
        ? "display: none;" // Hide the discount div if status is empty
        : "";

    cartSummaryHTML += `
      <div class="product-one">
        <div class="product-image">
          <img src="${matchingProduct.productImage}">
        </div>
        <div class="product-details">
          <h2>${matchingProduct.productName}</h2>
          <div class="quantity">
            <p>Amount:</p>
            <button class="quantity-btn minus-btn">-</button>
            <input class="quantity-input" type="text" value="${cartItem.amount}">
            <button class="quantity-btn plus-btn">+</button>
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
            ${matchingProduct.productPrice}
          </div>
        </div>
        <div class="delete-logo js-delete-button" data-product-id=${matchingProduct.productId}>
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    `;
  } else {
    console.error(`Product with ID ${productId} not found.`);
  }
});

document.querySelector(".order-summery-js").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    removeFromCart(productId);
  });
});
