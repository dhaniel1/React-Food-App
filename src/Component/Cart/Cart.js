import React, { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function onRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function onAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  function onOrderHandler() {
    setIsCheckout(true);
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      {...item}
      key={item.id}
      onRemove={onRemoveHandler.bind(null, item.id)}
      onAdd={onAddHandler.bind(null, item)}
    />
  ));

  const modalActions = (
    <div className={style.actions}>
      <button className={style["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={style.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <ul className={style["cart-items"]}> {cartItems}</ul>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onClose={props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
}
