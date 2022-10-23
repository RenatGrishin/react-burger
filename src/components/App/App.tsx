import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useEffect, useState, useContext } from 'react';
import { connectBurgerApi } from '../../utils/burger-api.js';
import { useDispatch, useSelector  } from 'react-redux';

function App() {
  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.wrapper}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
    
  );
}

export default App;
