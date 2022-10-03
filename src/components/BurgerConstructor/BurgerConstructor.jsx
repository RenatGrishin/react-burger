import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./burgerConstructor.module.css";

const list = {
  bun: "60666c42cc7b410027a1a9b2",
  ingredients: ["60666c42cc7b410027a1a9bf", "60666c42cc7b410027a1a9be"],
};

function BurgerConstructor(props) {
  const state = {
    price: 0,
    bun: {},
    ingredients: [],
  };

  function getIngredients() {
    const bun = props.ingredients.find((elem) => elem._id === list.bun);
    state.bun = {
      key: 1,
      text: bun.name,
      price: bun.price,
      thumbnail: bun.image,
    };

    list.ingredients.map((elem, index) => {
      const ingredient = props.ingredients.find((i) => i._id === elem);
      if (ingredient) {
        state.ingredients.push({
          key: index + 1,
          text: ingredient.name,
          price: ingredient.price,
          thumbnail: ingredient.image,
        });
      }
    });

    state.price =
      state.bun.price * 2 +
      state.ingredients.reduce((sum, i) => sum + i.price, 0);
  }
  getIngredients();

  return (
    <section className={style.burgerConstructor}>
      <ul className={style.crateBurger}>
        <li key={state.bun.key} className={style.list}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={state.bun.text}
            price={state.bun.price}
            thumbnail={state.bun.thumbnail}
          />
        </li>
        {state.ingredients.map((i) => (
          <li key={i.key} className={style.list}>
            <div className="mr-1">
              <DragIcon type="primary" />{" "}
            </div>
            <ConstructorElement
              type={i.position}
              isLocked={false}
              text={i.text}
              price={i.price}
              thumbnail={i.thumbnail}
            />
          </li>
        ))}

        <li key={state.bun.key + 1} className={style.list}>
          <ConstructorElement
            type="button"
            isLocked={true}
            text={state.bun.text}
            price={state.bun.price}
            thumbnail={state.bun.thumbnail}
          />
        </li>
      </ul>
      <div className={style.totalSum}>
        <p className="text text_type_digits-medium mr-2">{state.price}</p>
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
