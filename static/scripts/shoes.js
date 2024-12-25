import { allProduct} from "/static/data/all-products.js";
import { cart, addToCart } from "/static/data/cart.js";

/* shoes generation with js*/

const menEl = document.querySelector(".men-box")

allProduct.men.forEach((item)=>{
  
  const menDiv = document.createElement("div");
  menDiv.classList.add("item");

  menDiv.innerHTML = `
     <div class="product-card">
        <div class="product-image">
          <img src="${item.productImage}">
        </div>
        <div class="product-info">
          <div class="product-price">
            ${item.productPrice}
          </div>
        </div>
        <div class="product-text">
          ${item.productName}
        </div>
        <button class="add-btn add-btn-js"
        data-product-id = "${item.productId}">Add to cart</button>
      </div>
  `;

  menEl.appendChild(menDiv);
})

const womenEl = document.querySelector(".women-box");

allProduct.women.forEach((item)=>{
  const womenDiv = document.createElement("div");
  womenDiv.classList.add("item")

  womenDiv.innerHTML = `
    <div class="product-card">
        <div class="product-image">
          <img src="${item.productImage}">
        </div>
        <div class="product-info">
          <div class="product-price">
            ${item.productPrice}
          </div>
        </div>
        <div class="product-text">
          ${item.productName}
        </div>
        <button class="add-btn add-btn-js"
        data-product-id = "${item.productId}">Add to cart</button>
      </div>
  `

  womenEl.appendChild(womenDiv);
});

const salesEl = document.querySelector(".sales-box")

allProduct.sales.forEach((item)=>{
  const salesDiv = document.createElement("div");
  salesDiv.classList.add('item');

  salesDiv.innerHTML = `
    <div class="product-card">
          <div class="product-image">
            <img src="${item.productImage}">
            <div class="discount-number">-20%</div>
          </div>
          <div class="product-info">
            <div class="product-old-price">
              ${item.productOldPrice}
            </div>
            <div class="product-price">
              ${item.productPrice}
            </div>
          </div>
          <div class="product-text">
            ${item.productName}
          </div>
          <button class="add-btn add-btn-js"
          data-product-id = "${item.productId}">Add to cart</button>
        </div>
  `

  salesEl.appendChild(salesDiv);
});

/* end shoes generation with js*/


/* add to cart button */

function updateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.amount;
  });

  document.querySelector(".cart-quantity-js").innerHTML = cartQuantity;
}

 document.querySelectorAll(".add-btn-js")
  .forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
  
/* end add to cart button */







