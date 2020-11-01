import "./css/common.css";
import countriesListMarkup from "./temp/countries-list.hbs";
import countryMarkup from "./temp/countries-markup.hbs";
import API from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const cardContainer = document.querySelector('.js-card-container');
const searchInput = document.querySelector('.input-search');

searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch() {

    cardContainer.innerHTML = ""
    const searchedCountry = searchInput.value;

    if (searchedCountry === "") return;

    API.fetchCountry(searchedCountry)
        .then(isFetchSucces)
        .catch(onFetchErrorNoResults)

}

function renderCountryCard(template, country) {
    const markup = template(country);
    cardContainer.insertAdjacentHTML('beforeend', markup);

};

function onFetchErrorManyMatches() {
    error({
        title: 'Too many matches found',
        text: 'Please enter more specific query',
        delay: 2000,
        width: '500px',
    });

}

function onFetchErrorNoResults() {
    error({
        title: 'Invalid name of country entered',
        text: 'Please enter correct query',
        delay: 2000,
        width: '500px',
    });

}

function isFetchSucces(value) {
    if (value.length > 10) {
        onFetchErrorManyMatches();
    } else if (value.length <= 10 && value.length > 1) {
        renderCountryCard(countriesListMarkup, value);
    } else if (value.length === 1) {
        renderCountryCard(countryMarkup, value[0]);
    } else {
        onFetchErrorNoResults();
    }
}