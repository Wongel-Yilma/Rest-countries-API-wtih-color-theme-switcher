'use strict';
//////////////////////////////////////
// Select DOM Elements
const countryContainer = document.querySelector('.countries');
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
const API_URL = 'https://restcountries.com/v3.1/name/';

const createCountryData = function (data) {
  return {
    name: data.name.common,
    flag: data.flags.png,
    region: data.region,
    population: data.population,
    capital: data.capital ? data.capital : 'No Capital Listed',
  };
};
const generateMarkup = function (country) {
  console.log(country);
  return `
          <div class="country">
            <div class="country__flag">
              <img class="country__flag-img" src="${country.flag}" alt="Country flag" />
            </div>
            <div class="country__info">
              <h2 class="heading-2">${country.name}</h2>
               <div class="country__info-list">
                  <div class="country__info-item">

                  <p>Population:</p>
                  <span>${country.population}</span> </div>
                  <div class="country__info-item">
                  <p>Region:</p>
                  <span>${country.region}</span></div>
                  <div class="country__info-item">
                  <p>Capital:</p>
                  <span>${country.capital}</span></div>
                </div>
              </div>
            </div>
          </div>`;
};

const renderCountry = function (container, data) {
  const countryData = createCountryData(data);
  const markup = generateMarkup(countryData);
  container.insertAdjacentHTML('beforeend', markup);
};

const getAllCountries = async function () {
  const res = await fetch(API_URL_ALL);
  const data = await res.json();
  console.log(data);
  data.forEach(country => renderCountry(countryContainer, country));

  return data;
};
getAllCountries();

const getCountry = async function (country) {
  const res = await fetch(`${API_URL}${country}`);
  let data = await res.json();
  data = data[0];
  console.log(data);
  renderCountry(countryContainer, data);
  return data;
};

// getCountry('usa');

class App {
  constructor() {}
  generateMarkup(country) {
    console.log(country);
    return `
          <div class="country">
            <div class="country__flag">
              <img class="country__flag-img" src="${country.flag}" alt="Country flag" />
            </div>
            <div class="country__info">
              <h2 class="heading-2">${country.name}</h2>
               <div class="country__info-list">
                  <div class="country__info-item">

                  <p>Population:</p>
                  <span>${country.population}</span> </div>
                  <div class="country__info-item">
                  <p>Region:</p>
                  <span>${country.region}</span></div>
                  <div class="country__info-item">
                  <p>Capital:</p>
                  <span>${country.capital}</span></div>
                </div>
              </div>
            </div>
          </div>`;
  }
  getCountryData(country) {
    getCountry(country);
  }
  getAllCountriesData() {
    getAllCountries();
  }
}
