import { allProduct} from "/static/data/all-products.js";

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
        <button class="add-btn">Add to cart</button>
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
        <button class="add-btn">Add to cart</button>
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
          <button class="add-btn">Add to cart</button>
        </div>
  `

  salesEl.appendChild(salesDiv);
})




