import axios from 'axios';

const API_KEY = '8b4a1cfe7b37f251dcce8b232975fd6d';
const API_URL = 'https://api.openweathermap.org/data/2.5/find';
const AUTOCOMPLETE_KEY = '5c8d83bf56224ac7bc050c468370e700';
const AUTOCOMPLETE_URL = 'https://api.geoapify.com/v1/geocode/autocomplete';

export const getAutocomplete = async ({ value, onSuccess, onError, signal }) => {
  try {
    const res = await axios.get(AUTOCOMPLETE_URL, {
      params: {
        text: value,
        apiKey: AUTOCOMPLETE_KEY,
      },
      signal,
    });
    !!onSuccess && onSuccess(res?.data);
  } catch (error) {
    !!onError && onError();
  }
};

export const getWeatherList = async ({ value, onSuccess, onError }) => {
  try {
    const res = await axios.get(API_URL, {
      params: {
        q: value,
        appid: API_KEY,
      },
    });
    !!onSuccess && onSuccess(res?.data);
  } catch (error) {
    !!onError && onError();
  }
};
