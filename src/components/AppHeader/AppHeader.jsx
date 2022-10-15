import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./appHeader.module.css";

function AppHeader() {
  return (
    <header className={style.appHeader}>
      <div className={style.wrapper}>
        <a href="#" className={style.constrBurger}>
          <BurgerIcon className="pr-2" type="secondary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </a>
        <a href="#" className={style.listOrder}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Лента заказов</p>
        </a>
        <a href="#" className={style.logo}>
          <Logo />
        </a>
        <a href="#" className={style.userCabinet}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Личный кабинет</p>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
