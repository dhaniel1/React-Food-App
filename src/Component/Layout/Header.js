import React from "react";
import reactMealImage from '../../assets/images/meals.jpg'
import style from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
    return (
        <>
            <header className={style.header}>
                <h1>Tummy-Wise</h1>
                <HeaderCartButton showCart={props.showCart}/>
            </header>
            <div className={style['main-image']}>
                <img src={reactMealImage} alt="Nice Table" />
            </div>
        </>
    )

}