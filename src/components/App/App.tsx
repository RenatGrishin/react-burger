import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useEffect, useState, useContext } from 'react';
import {connectBurgerApi} from '../../utils/burger-api.js'

import {DataContext} from '../../services/dataContext';

function App() {
  const [status, setStatus] = useState("Материализация ингредиентов...");
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(()=>{
    connectBurgerApi()
    .then(data=>{
      setData(data.data);
      setLoadingData(false);
    })
    .catch((error) => {
      setStatus("Мы не можем найти ингредиенты :(");
      console.error(error);
    })
  }, [] );

  

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.wrapper}>
        <DataContext.Provider value={{data}}>
        {
        loadingData ? <h1>{status}</h1> : <>
          <BurgerIngredients />
          <BurgerConstructor />
        </> 
        }
        </DataContext.Provider>
      </main>
    </div>
    
  );
}

export default App;
