import BurgerTabs from "../BurgerTabs/BurgerTabs";
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from "prop-types";

import style from "./BurgerIngredients.module.css";

function BurgerIngredients(props) {
  function findCategory(category) {
    return props.ingredients.filter((arr) => arr.type === category);
  }

  return (
    <section className={style.burgerIngredients}>
      <p className="text text_type_main-large pt-10">Соберите бургер</p>
      <BurgerTabs />

      <section className={style.ingredients}>
        <div>
          <p className="text text_type_main-medium">Булки</p>
          <ul className={style.ingredientsList}>
            {findCategory("bun").map((elem) => (
              <Ingredient
                key={elem._id}
                id={elem._id}
                image={elem.image}
                price={elem.price}
                name={elem.name}
              />
            ))}
          </ul>
        </div>

        <div>
          <p className="text text_type_main-medium">Соусы</p>
          <ul className={style.ingredientsList}>
            {findCategory("sauce").map((elem) => (
              <Ingredient
                key={elem._id}
                id={elem._id}
                image={elem.image}
                price={elem.price}
                name={elem.name}
              />
            ))}
          </ul>
        </div>

        <div>
          <p className="text text_type_main-medium">Начинки</p>
          <ul className={style.ingredientsList}>
            {findCategory("main").map((elem) => (
              <Ingredient
                key={elem._id}
                id={elem._id}
                image={elem.image}
                price={elem.price}
                name={elem.name}
              />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;
