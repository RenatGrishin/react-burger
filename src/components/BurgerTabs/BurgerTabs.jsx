import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burgerTabs.module.css";

function BurgerTabs() {
  function onTabClick(e) {
    console.log(e);
  }

  return (
    <nav className={style.navigation}>
      <Tab value="one" active={true} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value="two" active={false} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value="three" active={false} onClick={onTabClick}>
        Начинки
      </Tab>
    </nav>
  );
}

export default BurgerTabs;
