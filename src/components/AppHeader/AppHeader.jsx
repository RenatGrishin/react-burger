import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.css";

function AppHeader() {
  return (
    <header className={style.appHeader}>
      <ul className={style.wrapper}>
        <li className={style.constrBurger}>
          <BurgerIcon className="pr-2" type="secondary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </li>
        <li className={style.listOrder}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Лента заказов</p>
        </li>
        <li className={style.logo}>
          <Logo />
        </li>
        <li className={style.userCabinet}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Личный кабинет</p>
        </li>
      </ul>
    </header>
  );
}

export default AppHeader;
