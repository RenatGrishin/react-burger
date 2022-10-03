import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerTabs() {
  return (
    <nav style={{ display: "flex" }} className="pt-5">
      <Tab value="one" active={true} onClick="">
        Булки
      </Tab>
      <Tab value="two" active={false} onClick="">
        Соусы
      </Tab>
      <Tab value="three" active={false} onClick="">
        Начинки
      </Tab>
    </nav>
  );
}

export default BurgerTabs;
