import BurgerTabs from "../BurgerTabs/BurgerTabs";
import Ingredient from "../Ingredient/Ingredient";

import style from './BurgerIngredients.module.css';

function BurgerIngredients (props){
    
    function findCategory (category) {
        return props.ingredients.filter( arr => arr.type === category );
    }

    return (
        <section className={style.burgerIngredients}>
            <p className="text text_type_main-large pt-10">Соберите бургер</p>
            <BurgerTabs />

            <section className={style.ingredients}>

                <div>
                    <p className="text text_type_main-medium">Булки</p>
                    <ul className={style.ingredientsList}>
                        {
                            findCategory('main').map( elem => <Ingredient 
                                id={elem._id} 
                                image={elem.image}
                                price={elem.price}
                                name={elem.name}
                                /> )
                        }
                    </ul>
                </div>

                <div>
                    <p className="text text_type_main-medium">Соусы</p>
                    <ul className={style.ingredientsList}>
                        {
                            findCategory('sauce').map( elem => <Ingredient 
                                id={elem._id}
                                image={elem.image}
                                price={elem.price}
                                name={elem.name}
                                /> )
                        }
                    </ul>
                </div>

                <div>
                    <p className="text text_type_main-medium">Начинки</p>
                    <ul className={style.ingredientsList}>
                        {
                            findCategory('bun').map( elem => <Ingredient 
                                id={elem._id} 
                                image={elem.image}
                                price={elem.price}
                                name={elem.name}
                                /> )
                        }
                    </ul>
                </div>
                
            </section>

        </section>
    );
}

export default BurgerIngredients;