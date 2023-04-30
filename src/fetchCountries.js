export { fetchCountries };
import Notiflix from 'notiflix';
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const clearInput = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

//definicja funkcji, która wysyła żądanie HTTP do endpointa (name.official,capital,population,flags,languages) z argumentem name jako nazwą kraju, którą użytkownik wpisuje w formularzu
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
// .then(data => {
//   if (data.length > 10) {
//   Notiflix.Notify.warning(
//   'Too many matches found. Please enter a more specific name.'
//     );
//   }
//   if (data.length >= 2 && data.length <= 10) {
//     clearInput();
//     const markup = countries
//       .map(country => {
//         return `<li class="cournriesList">
//   <img class="flag" src="${country.flags}" width="100" alt = "Flag of ${country.name}"/>
//    <p> <b>${country.name.official}</p></b> </li>
//           `;
//       })
//       .join('');
//     countryListEl.innerHTML = markup;
// } else if ((data.length = 1)) {
//   clearInput();
//   const countryInfo = `<li>
//   <img class="flag" src="${data.flags}" width="100"/>
//   <p><b>name: ${data.name}</b></p>
//   <p><b>capital: ${data.capital}</b></p>
//   <p><b>population: ${data.population}</b></p>
//   <p><b>languages: ${data.languages}</b></p>
//   </li>`;
//   countryInfoEl.innerHTML = countryInfo;
// }
// });
//   .catch(error => {
// Notiflix.Notify.failure('Oops, there is no country with that name');
// });
//}

// .then(countries => {
//   filteredList(countries);
// })
// .catch(error => {
//   //console.log('error input');
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// });
