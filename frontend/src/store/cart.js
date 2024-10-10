import { create } from "zustand";
import _ from "lodash";

// Helper function to check if an item is already in the cart
function checkIfItemInCart(item) {
  const cart = useCartStore.getState().cart;
  // Check if the item exists in the cart
  const existingItemList = cart.filter((cartItem) =>
    _.isEqual(cartItem.item, item.item)
  );
  if (existingItemList.length > 0) {
    for (let matchingItem of existingItemList) {
      // Check if the items match (excluding the quantity field)
      if (matchItems(matchingItem, item) === true) {
        return true;
      }
    }
  }
  return false;
}

// Helper function to match items (excluding the quantity field)
function matchItems(item1, item2) {
  // Clone the objects to avoid mutating the original data
  const item1Copy = { ...item1 };
  const item2Copy = { ...item2 };

  // Delete the quantity field from the cloned objects
  delete item1Copy.quantity;
  delete item2Copy.quantity;

  // Compare the objects after removing the quantity field
  return _.isEqual(item1Copy, item2Copy);
}

// Function to increment or decrement the quantity of an item in the cart
function incrementDecrementItemQuantity(item, action, quantity) {
  const cart = useCartStore.getState().cart;
  let cartCopy = [...cart]; // Clone the cart
  // Get all items in the cart with the same 'item' property
  const existingItemsList = cart.filter((cartItem) =>
    _.isEqual(cartItem.item, item.item)
  );

  for (const matchingItem of existingItemsList) {
    // Check for identical items (excluding the quantity)
    if (matchItems(matchingItem, item) === true) {
      const index = cart.indexOf(matchingItem);

      if (action === "increment") {
        // Increment the quantity
        cartCopy[index].quantity += quantity;
      } else if (action === "decrement") {
        // Decrement the quantity, and remove the item if the quantity becomes zero
        if (quantity >= cartCopy[index].quantity) {
          cartCopy = cartCopy.filter((cartItem) => cartItem !== matchingItem);
        } else {
          cartCopy[index].quantity -= quantity;
        }
      }
    }
  }
  return { cart: cartCopy };
}

// Initial state of the cart
const initialState = {
  cart: [],
};

// Zustand store for managing the cart
export const useCartStore = create((set) => ({
  ...initialState,

  // Function to set the entire cart manually
  setCart: (cart) =>
    set((state) => ({
      cart: cart,
    })),

  addToCart: (item) =>
    set((state) => {
      // Check if the item is already in the cart
      if (checkIfItemInCart(item)) {
        // If it exists, increment the quantity
        return incrementDecrementItemQuantity(item, "increment", item.quantity);
      }
      // If the item is not in the cart, add it
      return { cart: [...state.cart, item] };
    }),

  incrementQuantity: (item, incrementBy = 1) =>
    set((state) => ({
      cart: incrementDecrementItemQuantity(item, "increment", incrementBy).cart,
    })),

  decrementQuantity: (item, decrementBy = 1) =>
    set((state) => ({
      cart: incrementDecrementItemQuantity(item, "decrement", decrementBy).cart,
    })),

  // Function to reset the cart to the initial state
  reset: () => set(() => ({ ...initialState })),
}));
