import { BurgerIcon, ListIcon, Logo, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';

function AppHeader (){
    return(
        <header className={style.appHeader}>
            <div className={style.wrapper}>
                <div className={style.constrBurger}>
                    <BurgerIcon className="pr-2" type="secondary" />
                    <p className="text text_type_main-default pl-2">Конструктор</p>
                </div>
                <div className={style.listOrder}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default pl-2">Лента заказов</p>
                </div>
                <div className={style.logo}>
                    <Logo />
                </div>
                <div className={style.userCabinet}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default pl-2">Личный кабинет</p>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;