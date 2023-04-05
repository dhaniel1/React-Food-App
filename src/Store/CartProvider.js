import React, { useReducer } from "react";
import CartContext from "./cart-context";

function cartReducer(prevState, action) {
  if (action.type === "ADD") {
    // const updatedAmount = prevState.totalAmount + action.item.amount * action.item.price;
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if(action.type === 'CLEAR'){
    return defaultCartState;
  }
}

const defaultCartState = {
  items: [], // Items will receive an array of objects such as {amount, price, id, name }
  totalAmount: 0,
};

// CartProvider COMPONENT
export default function CartProvider(props) {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  function addItemToCartHandler(item) {
    dispatchCartState({ type: "ADD", item: item });
  }

  function removeItemFromCartHandler(id) {
    dispatchCartState({ type: "REMOVE", id: id });
  }

  function clearItemInCartHandler(){
    dispatchCartState({ type: "CLEAR"});

  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItem: clearItemInCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
