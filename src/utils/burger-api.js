import { BURGER_API_URL } from './connect.js'

export function connectBurgerApi(){
  return fetch(`${BURGER_API_URL}/api/ingredients`)
  .then( res => checkResponse(res) )
}

function checkResponse (res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function setOrderApi(data){
  return fetch(`${BURGER_API_URL}/api/orders`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }).then( res => checkResponse(res) )
}