'use strict';
//////////////////////////////////////
// Declare Variables
const API_URL_ALL = 'https://restcountries.com/v3.1/all';
const API_URL = 'https://restcountries.com/v3.1/name/';

// Select DOM Elements
const countryContainer = document.querySelector('.countries');
const selectFilter = document.querySelector('#region');
const formEl = document.querySelector('.form');
const backBtn = document.querySelector('.detail__btn');
const detailEl = document.querySelector('.detail');
// Dev
formEl.classList.add('hidden');
document.querySelector('.container').classList.add('hidden');
// Data Fetching Functions
const getAllCountries = async function () {
  const res = await fetch(API_URL_ALL);
  const data = await res.json();
  app.registerCountryData(data);
  console.log(data);
  data.forEach(country => app.renderCountry(countryContainer, country));
};

const getCountry = async function (country) {
  const res = await fetch(`${API_URL}${country}`);
  let data = await res.json();
  data = data[0];
  console.log(data);
  app.renderCountry(countryContainer, data);
};

class App {
  #detail;
  #countries = [];
  constructor() {
    this._getAllCountriesData();
    region.onchange = this._filterCountries.bind(this);
    formEl.addEventListener('submit', this.addFormSubmitHandler.bind(this));
    backBtn.addEventListener('click', this.detailHandler.bind(this));
  }
  addFormSubmitHandler(e) {
    e.preventDefault();
    const searchCountry = e.target.querySelector('.form__input').value;
    console.log(searchCountry);
    getCountry(searchCountry);
    this._clear(countryContainer);
  }
  registerCountryData(data) {
    this.#countries = data;
  }
  _generateMarkup(country) {
    const population = new Intl.NumberFormat().format(country.population);
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
                  <span>${population}</span> </div>
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
  _filterCountries(e) {
    const filter = e.target.value;
    const filteredCountries = this.#countries.filter(
      country => country.region === filter
    );
    this._clear(countryContainer);
    filteredCountries.forEach(country =>
      this.renderCountry(countryContainer, country)
    );
  }
  _clear(container) {
    container.innerHTML = '';
  }
  detailHandler() {
    const data = this.#countries[137];
    this._createDetailData(data);
    this._createDetailMarkup();
  }
  _createDetailData(data) {
    const { common } = Object.values(data.name.nativeName).at(0);
    const currencies = Object.values(data.currencies).reduce((curArr, cur) => {
      const { name } = cur;
      curArr.push(name);
      return curArr;
    }, []);
    const languages = Object.values(data.languages);
    console.log(data.borders);
    const borderCountries = data.borders;
    const borderNames = borderCountries.reduce((borders, border) => {
      const namedCountry = this.#countries.find(
        country => country.cca3 === border
      );
      borders.push(namedCountry.name.common);
      return borders;
    }, []);
    this.#detail = {
      name: data.name.common,
      flag: data.flags.png,
      region: data.region,
      population: data.population,
      capital: data.capital ? data.capital : 'No Capital Listed',
      nativeName: common,
      subRegion: data.subregion,
      currencies,
      languages,
      tld: data.tld[0],
      borderNames,
    };
  }
  _createDetailMarkup() {
    const detail = this.#detail;
    const currenciesMarkup = detail.currencies.reduce((markup, cur) => {
      return (markup += `<span>${cur}</span>`);
    }, '');
    const languagesMarkup = detail.languages.reduce((markup, cur) => {
      return (markup += `<span>${cur}</span>`);
    }, '');
    const borderMarkup = detail.borderNames.reduce((markup, cur) => {
      return (markup += `<button class="detail__border-btn" data-name="${cur}">${cur}</button>`);
    }, '');
    console.log(currenciesMarkup, languagesMarkup);
    const markup = `<div class="detail__preview">
          <div class="detail__img-box">
            <img src="${detail.flag}" alt="Preview Image" class="detail__img" />
          </div>
          <div class="detail__info">
            <h3 class="heading-3">${detail.name}</h3>
            <ul class="detail__list">
              <li class="detail__item">
                <p>Native Name:</p>
                <span>${detail.nativeName}</span>
              </li>
              <li class="detail__item">
                <p>Population:</p>
                <span>${detail.population}</span>
              </li>
              <li class="detail__item">
                <p>Region:</p>
                <span>${detail.region}</span>
              </li>
              <li class="detail__item">
                <p>Sub Region:</p>
                <span>${detail.subRegion}</span>
              </li>
              <li class="detail__item">
                <p>Capital:</p>
                <span>${detail.capital[0]}</span>
              </li>
              <li class="detail__item">
                <p>Top Level Domain:</p>
                <span>${detail.tld}</span>
              </li>
              <li class="detail__item">
                <p>Currencies:</p>
                <span>${currenciesMarkup}</span>
              </li>
              <li class="detail__item">
                <p>Languages:</p>
                <span>${languagesMarkup}</span>
              </li>
            </ul>
            <div class="detail__border">
              <p>Border Countries:</p>
              <div class="detail__border-btns">
                ${borderMarkup}
              </div>
            </div>
          </div>
        </div>`;
    detailEl.insertAdjacentHTML('beforeend', markup);
  }
}
const app = new App();

// Native Name : data.name.nativeName

// const data = {
//   name: {
//     nativeName: { hrv: { official: 'Republika Hrvatska', common: 'Hrvatska' } },
//   },
//   currencies: {
//     CKD: { name: 'Cook Islands dollar', symbol: '$' },
//     NZD: { name: 'New Zealand dollar', symbol: '$' },
//   },
//   languages: {
//     kal: 'Greenlandic',
//   },
//   borders: {
//     0: 'ARM',
//     1: 'AZE',
//     2: 'RUS',
//     3: 'TUR',
//   },
// };

// const { common } = Object.values(data.name.nativeName).at(0);

// console.log(common);

// console.log(Object.values(data.currencies));
// let curArr = [];
// Object.values(data.currencies).forEach(cur => {
//   const { name } = cur;
//   console.log(name);
//   curArr.push(name);
// });

// console.log(curArr);

// const currecies = Object.values(data.currencies).reduce((curArr, cur) => {
//   const { name } = cur;
//   curArr.push(name);
//   return curArr;
// }, []);

// const languages = Object.values(data.languages);

// console.log(languages);

// const borderCountries = Object.values(data.borders);
// console.log(borderCountries);
