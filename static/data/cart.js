export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [
    {
      productId: "1",
      amount: 1,
    },
    {
      productId: "17",
      amount: 1,
    },
  ];
}


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
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
