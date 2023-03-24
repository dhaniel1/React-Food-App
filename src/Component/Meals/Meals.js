import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

export default function Meals(props) {
    return <>
        <MealsSummary />
        <AvailableMeals /* id={Math.random()*100}*/ />
    </>
}