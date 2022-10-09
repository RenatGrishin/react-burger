import { BURGER_API_URL } from './connect.js'

export function connectBurgerApi( setData, setLoadingData, setStatus ){
    fetch(`${BURGER_API_URL}/api/ingredients`)
    .then( res => checkResponse(res, setStatus)
      )
    .then(data=>{
      setData(data.data);
      setLoadingData(false);
    })
    .catch((error) => {
      setStatus("Мы не можем найти ингредиенты :(")
      console.error(error)
    });
}

function checkResponse (res, setStatus) {
    if( res.ok) {
        return res.json()
    }
    setStatus("Мы не можем найти ингредиенты :(")
    return res.json().then((err) => Promise.reject(err))
  }