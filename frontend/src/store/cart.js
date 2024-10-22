import { create } from "zustand";
import _ from "lodash";

// Helper function to check if an item is already in the cart
function checkIfItemInCart(item) {
  const cart = useCartStore.getState().cart;
  // Check if the item exists in the cart
  const listOfExistingItems = cart.filter(
    (cartItem) => cartItem.name === item.name
  );
  if (listOfExistingItems.length > 0) {
    for (const cartItem of listOfExistingItems) {
      if (matchItems(cartItem, item)) {
        console.log("match");
        return true;
      }
    }
  }
  console.log("no match");
  return false;
}

// Helper function to match items (excluding the quantity and price fields)
function matchItems(item1, item2) {
  // Clone the objects to avoid mutating the original data
  const item1Copy = { ...item1 };
  const item2Copy = { ...item2 };

  // Delete the quantity and price fields from the cloned objects
  delete item1Copy.quantity;
  delete item1Copy.price;

  delete item2Copy.quantity;
  delete item2Copy.price;

  // Compare the objects after removing the quantity and price fields
  return _.isEqual(item1Copy, item2Copy);
}

// Function to increment or decrement the quantity of an item in the cart
function incrementDecrementItemQuantity(item, action, quantity) {
  const cart = useCartStore.getState().cart;
  let cartCopy = [...cart];

  const listOfExsitingItems = cart.filter(
    (cartItem) => cartItem.name === item.name
  );
  console.log(listOfExsitingItems);

  for (const cartItem of listOfExsitingItems) {
    // Check for identical items (excluding the quantity and price)
    if (matchItems(cartItem, item) === true) {
      const index = cart.indexOf(cartItem);

      if (action === "increment") {
        // Increment the quantity
        cartCopy[index].quantity += quantity;
      } else if (action === "decrement") {
        // Decrement the quantity, and remove the item if the quantity becomes zero
        if (quantity >= cartCopy[index].quantity) {
          cartCopy = cartCopy.filter((cartItem) => !matchItems(cartItem, item));
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

  addToCart: (item, quantity) =>
    set((state) => {
      // Check if the item is already in the cart
      if (checkIfItemInCart(item)) {
        // If it exists, increment the quantity
        return incrementDecrementItemQuantity(item, "increment", quantity);
      }
      // If the item is not in the cart, add it
      return { cart: [...state.cart, { ...item, quantity }] };
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
