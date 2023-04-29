import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
let flagImg;

//countryInfoEl.innerHtml = `<img class="flag-list" src="${country.flags.svg}"/> ;
function filteredList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="cournriesList">
      <img class="flag" src="${country.flags.svg}" width="100"/>
       <p> <b> </b>${country.name.official}</p></b> </li>
              `;
    })
    .join('');

  countryListEl.innerHTML = markup;
}
//<p>capital: ${country.capital}</p>
//<p>population: ${country.population}</p>
// <p>languages: ${country.languages}</p>

inputEl.addEventListener('input', () => {
  // console.log('error input');
  fetchCountries()
    .then(countries => {
      filteredList(countries);
    })
    .catch(error => {
      console.log('error input');
      //Notiflix.Notify.failure('Oops, there is no country with that name');
    });
});
