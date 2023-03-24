import React from "react";
import style from './Modal.module.css';
import ReactDOM from "react-dom";


function BackDrop(props) {
    return <div className={style.backdrop} onClick={props.onClose} />
}

function ModalOverlay(props) {
    return <div className={style.modal}>
        <div>{props.children}</div>
    </div>
}

export default function Modal(props) {

    const portalElements = document.getElementById('overLays');

    return <>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElements)}
        {ReactDOM.createPortal(<ModalOverlay> {props.children}</ModalOverlay>, portalElements)}
    </>
}