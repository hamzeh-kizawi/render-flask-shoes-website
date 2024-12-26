export let cart = [
  {
    productId: "1",
    amount: 1,
  },
  {
    productId: "17",
    amount: 1,
  }
];

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
}
