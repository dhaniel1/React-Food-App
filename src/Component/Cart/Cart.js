import React, { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
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

  async function finalCheckout(userData) {
    setIsSubmitting(true);
    const res = await fetch(
      "https://react-apps-d280e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    const response = await res.json();
    setIsSubmitting(false);
    setHasSubmitted(true);

    cartCtx.clearItem()
    console.log(response);
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

  const cartModalContent = (
    <>
      <ul className={style["cart-items"]}> {cartItems}</ul>
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onClose={props.onClose} onFinalOrderClick={finalCheckout} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Your order is being placed</p>;

  const hasSubmittedModalContent = (
    <>
      <p>Your order has successfully been placed</p>
      <button className={style["button-alt"]} onClick={props.onClose}>
        Close
      </button>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !hasSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {hasSubmitted && hasSubmittedModalContent}
    </Modal>
  );
}
