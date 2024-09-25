import { create } from "zustand";

// TODO CREATE A FUNCTION THAT SEARCHES FOR AN ITEM IN THE CART
const getCartItemWithoutQuantity = (item) => {
  return useCartStore
    .getState()
    .cart.filter((cartItem) => cartItem.item === item.item)
    .map(({ quantity, ...itemWithoutQuantity }) => itemWithoutQuantity)[0]; // Remove quantity
};

const initialState = {
  cart: [],
};

export const useCartStore = create((set) => ({
  ...initialState,
  addToCart: (item, quantity = 1) =>
    set((state) => {
      // Check if item is in cart
      const existingItemList = state.cart.filter(
        (cartItem) => cartItem.item === item.item
      );
      if (existingItemList.length > 0) {
        for (let matchingItem of existingItemList) {
          // creating a string copy of the received item and the one of the cart but without the quantity property
          const matchingItemWithoutQuantity = String(
            JSON.stringify(matchingItem).split(',"quantity"')[0]
          );
          const itemWithoutQuantity = String(
            JSON.stringify(item).split(',"quantity"')[0]
          );
          // comprating them to see if they are the same order (example: different removed ingredients from pizza)
          if (matchingItemWithoutQuantity === itemWithoutQuantity) {
            // if items match, increment quantity
            const indexOfExistingItem = state.cart.indexOf(matchingItem);
            let cartCopy = state.cart.slice();
            cartCopy[indexOfExistingItem].quantity += quantity;
            return { cart: cartCopy };
          }
        }
      }
      return { cart: [...state.cart, item] };
    }),
  incrementQuantity: (item, incrementBy = 1) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.item === item
      );
      if (existingItem) {
        const indexOfExistingItem = state.cart.indexOf(existingItem);
        let cartCopy = state.cart.slice();
        cartCopy[indexOfExistingItem].quantity += incrementBy;

        return {
          cart: cartCopy,
        };
      } else {
        return { cart: [...state.cart] };
      }
    }),
  resetCart: () => set(() => ({ ...initialState })),
}));
