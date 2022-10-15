import { BURGER_API_URL } from './connect.js'

export function connectBurgerApi(){
  return fetch(`${BURGER_API_URL}/api/ingredients`)
  .then( res => checkResponse(res) )
}

function checkResponse (res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}