import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(() => {
    fetchCountries()
      .then(countries => {
        if (Array.isArray(countries)) {
          if (countries.length > 10) {
            Notiflix.Notify.warning(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (countries.length >= 2 && countries.length <= 10) {
            filteredList(countries);
          } else if (countries.length === 1) {
            filteredCountry(countries);
            // } else {
            //   Notiflix.Notify.failure('Oops, there is no country with that name');
          }
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }),
  DEBOUNCE_DELAY
);

async function fetchCountries() {
  //pobiera dane z serwera w formacie JSON za pomocą metody fetch()
  return await fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  ).then(response => {
    if (!response.ok) {
      if (response === 404) {
        throw new Error(404);
      } else {
        throw new Error('No results founded');
      }
    }
    // przekazuje obietnicę której wynikiem będzie tablica krajów będącą wynikiem żądania
    // metoda response.json() przetwarza odpowiedź i zwraca obiekt js jako tablicę krajów.
    return response.json();
  });
}
const clearInput = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

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

// inputEl.addEventListener('input', filteredList);

//   'input',
//   debounce(ev => {
//     let nameCountry = ev.target.value.trim();
//     const countries = fetchCountries(nameCountry);

//     if (inputEl === '') {
//       clearInput();
//     } else if (countries.length > 10) {
//       Notiflix.Notify.warning(
//         'Too many matches found. Please enter a more specific name.'
//       );
//     } else if (countries.length >= 2 && countries.length <= 10) {
//       filteredList();
//     } else if ((countries.length = 1)) {
//       console.log('error');
//       //filteredCountry();
//     }
//     Notiflix.Notify.failure('Oops, there is no country with that name');
//   }),
//   DEBOUNCE_DELAY
// );

//  .then(countries => {
//         filteredList(countries);
//       })
//       .catch(error => {
//         console.log('error input');
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       });
