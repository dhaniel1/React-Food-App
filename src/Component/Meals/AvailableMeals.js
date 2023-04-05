import React, { useEffect, useState } from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

export default function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);

      const response = await fetch(
        "https://react-apps-d280e-default-rtdb.firebaseio.com/Meals.json"
      );
      console.log(response);

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          ...data[key],
        });
      }
      setMeals(loadedMeals);

      setIsLoading(false);
    }
    //

    fetchMeals().catch((err) => {
      setError(err.message);
      setIsLoading(false);
      console.log(err.message);
    });
  }, []);

  if (error) {
    return (
      <section className={style.meals}>
        <Card className={style.isLoading}>{error}</Card>;
      </section>
    );
  }

  const mealsList = (
    <ul>
      {meals.map((meal) => (
        <MealItem key={meal.id} {...meal} />
      ))}
    </ul>
  );

  return (
    <section className={style.meals}>
      {isLoading && (
        <Card className={style.isLoading}>
          <p>Loading...</p>
        </Card>
      )}
      {!isLoading && <Card>{mealsList}</Card>}
    </section>
  );
}
