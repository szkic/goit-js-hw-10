import Notiflix from 'notiflix';

const countryEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const API_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  name = name.trim();
  fetch(API_URL + name + FILTER)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(country => {
      if (country.length > 10) {
        tooMuchCountries(country);
      } else if (country.length >= 2 && country.length <= 10) {
        fewCountries(country);
      } else if ((country.length = 1)) {
        oneCountry(country);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clearCountries();
    });
};

const tooMuchCountries = country => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

const fewCountries = country => {
  clearCountries();

  const countries = country
    .map(countryName => {
      return `<li><img src="${countryName.flags.svg}" alt="${countryName.flags.alt} width="17" height="17"><p> ${countryName.name.official}</p></li>`;
    })
    .join(' ');

  countryEl.innerHTML = countries;
};

const oneCountry = country => {
  clearCountries();

  const countries = country
    .map(countryName => {
      return `<li>
       <h2 style="font-size: 40px"><img src="${countryName.flags.svg}" alt="${
        countryName.flags.alt
      } width="30" height="30"> ${countryName.name.official}</h2>
        <p><span style="font-weight: bold">Capital:</span> ${
          countryName.capital
        }</p>
        <p><span style="font-weight: bold">Population:</span> ${countryName.population.toLocaleString()}</p>
        <p><span style="font-weight: bold">Languages:</span> ${Object.values(
          countryName.languages
        ).join(', ')}</p>
      </li>`;
    })
    .join(' ');

  countryInfoEl.innerHTML = countries;
};

const clearCountries = () => {
  countryEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};
