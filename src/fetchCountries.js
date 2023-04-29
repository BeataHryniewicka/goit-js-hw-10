import Notiflix from 'notiflix';
export { fetchCountries };

//definicja funkcji, która wysyła żądanie HTTP do endpointa (name.official,capital,population,flags,languages) z argumentem name jako nazwą kraju, którą użytkownik wpisuje w formularzu
// async function fetchCountries() {
//   //pobiera dane z serwera w formacie JSON za pomocą metody fetch()
//   const response = await fetch(
//     'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
//   );
//   // przekazuje obietnicę której wynikiem będzie tablica krajów będącą wynikiem żądania
//   //metoda response.json() przetwarza odpowiedź i zwraca obiekt js jako tablicę krajów(data).
//   const data = await response.json();
//   // if (data.length > 10) {
//   // console.log('error10');
//   //Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
//   //}
//   return data;
// }

async function fetchCountries() {
  return await fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
