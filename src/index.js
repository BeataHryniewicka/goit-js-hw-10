import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const flagEl = document.createElement('img');
//flagEl.src =  ${country.flags.svg};
//flagEL.alt = `Flag of ${country.name.official}`;

function filteredCountry(country) {
  const countryInfo = `<li>
<img class="flag" src="${country.flags.svg}" width="100" alt = "Flag of ${country.name.official}"/>;
<p><b>name: ${country.name.oficcial}</b></p>
<p><b>capital: ${country.capital}</b></p>
<p><b>population: ${country.population}</b></p>
<p><b>languages: ${country.languages}</b></p>
</li>`;
  countryInfoEl.innerHTML = countryInfo;
}
// filteredCountry();

function filteredList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="cournriesList">
      <img class="flag" src="${country.flags.svg}" width="100" alt = "Flag of ${country.name.official}"/>
       <p> <b>${country.name.official}</p></b> </li>
              `;
    })
    .join('');

  countryListEl.innerHTML = markup;
}

inputEl.addEventListener('input', () => {
  // console.log('error input');
  fetchCountries();
  // .then(countries => {
  //   filteredList(countries);
  // })
  // .catch(error => {
  //   //console.log('error input');
  //   Notiflix.Notify.failure('Oops, there is no country with that name');
  // });
});
