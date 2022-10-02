import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCustom from '../IngredientCustom/IngredientCustom';

import style from './BurgerConstructor.module.css';

function BurgerConstructor ( props ) {
    let totalPrice = 0;

    function createBurger () {
        let list = {
            bun: '60666c42cc7b410027a1a9b2',
            ingredients:[
                '60666c42cc7b410027a1a9bf',
                '60666c42cc7b410027a1a9be'
            ]
        }
        let burger = [];

        let bun = props.ingredients.find( elem => elem._id === '60666c42cc7b410027a1a9b2' );
        burger.push(<IngredientCustom 
                position="top" 
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
            />)

        list.ingredients.map( (elem) => {
            let ingr = props.ingredients.find( i => i._id === elem );
            if (ingr){
                totalPrice += ingr.price;
                burger.push(<IngredientCustom
                    text={ingr.name}
                    price={ingr.price}
                    thumbnail={ingr.image} 
                />)
            }
        } );

        burger.push(<IngredientCustom 
                position="bottom"
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
            />)

        totalPrice += bun.price;
        return burger;
    }

    return(
        <section className={style.burgerConstructor}>
            <ul className={style.crateBurger}>
                {createBurger()}
            </ul>
            <div className={style.totalSum}>
                <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;