import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const clearInput = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};
inputEl.addEventListener(
  'input',
  debounce(async event => {
    const countryName = event.target.value.trim();
    fetchCountries(countryName).then(countries => {
      console.log(Array.isArray(countries));
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        filteredList(countries);
      } else if (countries.length === 1) {
        filteredCountry(countries);
      }
    });
  }),
  DEBOUNCE_DELAY
);

function filteredCountry(countries) {
  console.log(Array.isArray(countries));
  clearInput();
  const countryInfo = countries
    .map(country => {
      return `<li class= "country-list">
  <img src="${country.flags.svg}" width="100" alt = "Flag of ${country.name.official}"/>
  <p><b>name: ${country.name.official}</b></p>
  <p><b>capital: ${country.capital}</b></p>
  <p><b>population: ${country.population}</b></p>
  <p><b>languages: ${country.languages}</b></p>
  </li>`;
    })
    .join('');
  countryInfoEl.innerHTML = countryInfo;
}
function filteredList(countries) {
  console.log(Array.isArray(countries));
  const markup = countries
    .map(country => {
      return `<li class="country-list">
      <img class="flag" src="${country.flags.svg}" width="100" alt = "Flag of ${country.name.official}"/>
       <p> <b>${country.name.official}</p></b> </li>
              `;
    })
    .join('');
  countryListEl.innerHTML = markup;
}
