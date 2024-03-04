import md5 from 'md5'; 
import { APIParams } from '../types/productsTypes';

const API_URL = 'http://api.valantis.store:40000/';
const PASSWORD = 'Valantis';

export const fetchProduct = async ({action, params}: APIParams) => {

  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const xAuth = md5(PASSWORD + '_' + date);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': xAuth
    },
    body: JSON.stringify({action, params})
  });

  if (response.status === 401) {
    return new Error('Unauthorized'); 
  }
  if (response.status === 400) {
    return 'Bad Request'; 
  }

  const data = await response.json();

  return data.result;
}