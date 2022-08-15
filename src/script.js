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
    capital: data.capital[0],
  };
};
const generateMarkup = function (country) {
  return `
          <div class="country">
            <div class="country__flag">
              <img class="country__flag-img" src="${country.flag}" alt="Country flag" />
            </div>
            <div class="country__info">
              <h2 class="heading-2">${country.name}</h2>
              <div class="country__info-item">
                <p>population</p>
                <span>${country.population}</span>
                <p>Region</p>
                <span>${country.region}</span>
                <p>Capital</p>
                <span>${country.capital}</span>
              </div>
            </div>
          </div>`;
};

const renderCountry = function (container, data) {};

const getAllCountries = async function () {
  const res = await fetch(API_URL_ALL);
  const data = await res.json();
  console.log(data);
  return data;
};
// getAllCountries();
const getCountry = async function (country) {
  const res = await fetch(`${API_URL}${country}`);
  let data = await res.json();
  data = data[0];
  createCountryData(data);
  return data;
};

// getCountry('usa');
