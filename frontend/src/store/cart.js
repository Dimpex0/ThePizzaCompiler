import { create } from "zustand";

function checkIfItemInCart(item) {
  const cart = useCartStore.getState().cart;
  // Check if item is in cart
  const existingItemList = cart.filter(
    (cartItem) => cartItem.item === item.item
  );
  if (existingItemList.length > 0) {
    for (let matchingItem of existingItemList) {
      // checking if the items match
      if (matchItems(matchingItem, item) === true) {
        return true;
      }
    }
  }
  return false;
}

function matchItems(item1, item2) {
  // creating a string copy of the received item and the one of the cart but without the quantity property
  const matchingItemWithoutQuantity = String(
    JSON.stringify(item1).split(',"quantity"')[0]
  );
  const itemWithoutQuantity = String(
    JSON.stringify(item2).split(',"quantity"')[0]
  );
  // comprating them to see if they are the same order (example: different removed ingredients from pizza)
  if (matchingItemWithoutQuantity === itemWithoutQuantity) {
    return true;
  }
  return false;
}

function incrementDecrementItemQuantity(item, action, quantity) {
  const cart = useCartStore.getState().cart;
  let cartCopy = cart.slice();
  // getting all same items in the cart
  const existingItems = cart.filter((cartItem) => cartItem.item === item.item);
  for (const matchingItem of existingItems) {
    // checking for identical order (for example: same removed ingredients)
    if (matchItems(matchingItem, item) === true) {
      const indexOfExistingItem = cart.indexOf(matchingItem);
      if (action === "increment") {
        cartCopy[indexOfExistingItem].quantity += quantity;
      } else if (action === "decrement") {
        if (quantity >= cart[indexOfExistingItem].quantity) {
          return { cart: cart.filter((cartItem) => cartItem.item !== item) };
        }
        cartCopy[indexOfExistingItem].quantity -= quantity;
      }
    }
  }
  return { cart: cartCopy };
}

const initialState = {
  cart: [],
};

export const useCartStore = create((set) => ({
  ...initialState,
  addToCart: (item) =>
    set((state) => {
      // Check if item is in cart
      if (checkIfItemInCart(item)) {
        return incrementDecrementItemQuantity(item, "increment", item.quantity);
      }
      // If item not in cart, just add it
      return { cart: [...state.cart, item] };
    }),
  incrementQuantity: (item, incrementBy = 1) =>
    set((state) => {
      // Check if item is in cart
      if (checkIfItemInCart(item)) {
        return incrementDecrementItemQuantity(item, "increment", incrementBy);
      }
      // Fallback, this function should be called only in the cart page where it's sure that the item exists
      return { cart: [...state.cart] };
    }),
  decrementQuantity: (item, decrementBy = 1) =>
    set((state) => {
      // Check if item is in cart
      if (checkIfItemInCart(item)) {
        return incrementDecrementItemQuantity(item, "decrement", decrementBy);
      }
      // Fallback, this function should be called only in the cart page where it's sure that the item exists
      return { cart: [...state.cart] };
    }),
  resetCart: () => set(() => ({ ...initialState })),
}));
