import style from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import data from './utils/data.js';

function App() {
  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.wrapper}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </main>
    </div>
  );
}

export default App;
