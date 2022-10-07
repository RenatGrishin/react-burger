import style from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState("Материализация ингредиентов...");
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(()=>{
    fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(response=>response.json())
    .then(data=>{
      setData(data.data);
      setLoadingData(false);
    })
    .catch((error) => {
      setStatus("Мы не можем найти ингредиенты :(")
      console.error(error)
    });
  }, [] );

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.wrapper}>
        {
        loadingData ? <h1>{status}</h1> : <>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </> 
        }
        
      </main>
    </div>
    
  );
}

export default App;
