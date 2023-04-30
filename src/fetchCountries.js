export { fetchCountries };
import Notiflix from 'notiflix';

//definicja funkcji, która wysyła żądanie HTTP do endpointa (name.official,capital,population,flags,languages) z argumentem name jako nazwą kraju, którą użytkownik wpisuje w formularzu
async function fetchCountries() {
  //pobiera dane z serwera w formacie JSON za pomocą metody fetch()
  return await fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  )
    .then(response => {
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
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
