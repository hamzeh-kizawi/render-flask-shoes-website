export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "1",
      amount: 1,
      size: null,
    },
    {
      productId: "17",
      amount: 1,
      size: null,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartQuantity();
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.amount += 1;
  } else {
    cart.push({
      productId: productId,
      amount: 1,
    });
  }
  saveToStorage();
}

export function updateCartQuantity(){
  const cartQuantity = cart.reduce((total, cartItem)=> total + cartItem.amount,0);
  localStorage.setItem(".cartQuantity", cartQuantity);
  document.querySelectorAll(".cart-quantity-js").forEach((el)=>{
    el.textContent = cartQuantity
  })
}


export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}


export function updateQuantity(productId, change) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.amount += change;
    if (cartItem.amount < 1) {
      cartItem.amount = 1;
    }

    saveToStorage(); 
  }
}

export function updateSize(productId, size){
  const cartItem = cart.find((item) => item.productId === productId);
  if(cartItem){
    cartItem.size = size;
    saveToStorage();
  }
}


export function calculateCartPrice(allProduct) {
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = findProductById(cartItem.productId, allProduct);
    if (matchingProduct) {
      const productPrice = parseFloat(
        matchingProduct.productPrice.replace("$", "").trim()
      );
      totalPrice += productPrice * cartItem.amount;
    }
  });

  return totalPrice.toFixed(2);
}

export function calculateCartSubTotalPrice(allProduct) {
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = findProductById(cartItem.productId, allProduct);
    if (matchingProduct) {
      const productPrice = parseFloat(
        matchingProduct.productPrice.replace("$", "").trim()
      );
      totalPrice += productPrice;
    }
  });

  return totalPrice.toFixed(2);
}

export function findProductById(productId, allProduct) {
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
