import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './IngredientCustom.module.css';

function IngredientCustom (props) {
    function setConstructioElement () {
        switch (props.position) {
            case 'top':
                return  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={props.text}
                    price={props.price}
                    thumbnail={props.thumbnail}
                />
            break;
            case 'bottom':
                return <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={props.text}
                    price={props.price}
                    thumbnail={props.thumbnail}
                />
            break;
            default:
                return <ConstructorElement
                    text={props.text}
                    price={props.price}
                    thumbnail={props.thumbnail}
                />
        }
    }
    return (
        <li className={style.list}>
            {!props.position ? <div className="mr-1"> <DragIcon type="primary" /> </div> : ''}
            {setConstructioElement()}
        </li>
    )
}

export default IngredientCustom;