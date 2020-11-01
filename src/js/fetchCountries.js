const BASE_URL = 'https:restcountries.eu/rest/v2/name'

function fetchCountry(country) {
    return fetch(`${BASE_URL}/${country}`)
        .then(response => {
            return response.json();
        })
};
export default { fetchCountry };