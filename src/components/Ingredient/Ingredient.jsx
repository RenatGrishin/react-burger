import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';

function Ingredient (props) {
    return(
        <li className={style.card}>
            <img className='mb-1' src={props.image} />
            <div style={ {display:'flex', alignItems: 'center', justifyContent: 'center'} }>
                <p className="text text_type_digits-default mr-3">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-1">{props.name}</p>
        </li>
    )
}

export default Ingredient;