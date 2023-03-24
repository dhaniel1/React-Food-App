import React from "react";

const CartContext = React.createContext({
    items: [], // Items will recieve an array of objects
    totalAmount: 0,
    addItem: () => { },
    removeItem: () => { }
})

export default CartContext;