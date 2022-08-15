'use strict';
//////////////////////////////////////
// Select DOM Elements
const countryContainer = document.querySelector('.countries');
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
const API_URL = 'https://restcountries.com/v3.1/name/';

// Data Fetching Functions
const getAllCountries = async function () {
  const res = await fetch(API_URL_ALL);
  const data = await res.json();
  console.log(data);
  app.registerCountryData(data);
  data.forEach(country => app.renderCountry(countryContainer, country));
};

const getCountry = async function (country) {
  const res = await fetch(`${API_URL}${country}`);
  let data = await res.json();
  data = data[0];
  console.log(data);
  app.renderCountry(countryContainer, data);
};

// getCountry('usa');

class App {
  #countries = [];
  constructor() {
    this._getAllCountriesData();
  }
  registerCountryData(data) {
    this.#countries = data;
  }
  _generateMarkup(country) {
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
  _getCountryData(country) {
    getCountry(country);
  }
  _getAllCountriesData() {
    getAllCountries();
  }
  renderCountry(container, data) {
    const countryData = this._createCountryData(data);
    const markup = this._generateMarkup(countryData);
    container.insertAdjacentHTML('beforeend', markup);
  }
  _createCountryData(data) {
    return {
      name: data.name.common,
      flag: data.flags.png,
      region: data.region,
      population: data.population,
      capital: data.capital ? data.capital : 'No Capital Listed',
    };
  }
}
const app = new App();
