import React, { useContext } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function onRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function onAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      {...item}
      key= {item.id}
      onRemove={onRemoveHandler.bind(null, item.id)}
      onAdd={onAddHandler.bind(null, item)}
    />
  ));

  return (
    <Modal onClose={props.onClose}>
      <ul className={style["cart-items"]}> {cartItems}</ul>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={style.actions}>
        <button className={style["button-alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={style.button} /* onClick={props.onOrder} */>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}
