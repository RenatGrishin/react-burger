import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCustom from "../IngredientCustom/IngredientCustom";

import style from "./BurgerConstructor.module.css";

function BurgerConstructor(props) {
  let totalPrice = 0;

  function createBurger() {
    let keyId = 1;
    let list = {
      bun: "60666c42cc7b410027a1a9b2",
      ingredients: ["60666c42cc7b410027a1a9bf", "60666c42cc7b410027a1a9be"],
    };
    let burger = [];

    let bun = props.ingredients.find(
      (elem) => elem._id === "60666c42cc7b410027a1a9b2"
    );
    burger.push(
      <IngredientCustom
        key={keyId}
        position="top"
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image}
      />
    );

    list.ingredients.map((elem) => {
      keyId++;
      let ingredient = props.ingredients.find((i) => i._id === elem);
      if (ingredient) {
        totalPrice += ingredient.price;
        burger.push(
          <IngredientCustom
            key={keyId}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        );
      }
    });

    keyId++;
    burger.push(
      <IngredientCustom
        key={keyId}
        position="bottom"
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image}
      />
    );

    totalPrice += bun.price;
    return burger;
  }

  return (
    <section className={style.burgerConstructor}>
      <ul className={style.crateBurger}>{createBurger()}</ul>
      <div className={style.totalSum}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      __v: PropTypes.number,
      _id: PropTypes.string,
      calories: PropTypes.number,
      carbohydrates: PropTypes.number,
      fat: PropTypes.number,
      image: PropTypes.string,
      image_large: PropTypes.string,
      image_mobile: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      proteins: PropTypes.number,
      type: PropTypes.string,
    })
  ),
};

export default BurgerConstructor;
