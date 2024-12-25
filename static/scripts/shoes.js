import { allProduct, cart} from "/static/data/all-products.js";

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
 document.querySelectorAll(".add-btn-js")
  .forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;

      let matchingItem;

      cart.forEach((item)=>{
        if(productId === item.productId){
          matchingItem = item;
        }
      });

      if(matchingItem){
        matchingItem.amount += 1
      } else {
        cart.push({
          productId: productId,
          amount: 1
        });
      }

      let cartQuantity = 0;

      cart.forEach((item)=>{
        cartQuantity += item.amount;
      });

      document.querySelector(".cart-quantity-js").innerHTML = cartQuantity; 
      console.log(cart);
      
    });
  });
  
/* end add to cart button */







