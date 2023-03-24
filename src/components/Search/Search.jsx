import React, { useState, useRef } from 'react';
import styles from './style.scss';
import { SearchIcon } from './SearchIcon';
import { getWeatherList } from '../../api';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export const Search = ({ onChangeList }) => {
  const [search, setSearch] = useState('');
  const [isShowAutocomplete, setIsShowAutocomplete] = useState(false);
  const { autocomplete, onChangeAutocomplete } = useAutocomplete();
  const ref = useRef(null);

  const onSuccess = (data) => {
    onChangeList(data?.list);
  };

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
    onChangeAutocomplete(value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!search) return;

    fetchWeather(search);
    handleBlur();
    const searchInput = e.target[0];
    searchInput.blur();
  };

  const fetchWeather = (val) => {
    getWeatherList({ value: val, onSuccess });
  };

  const handleClick = (val) => () => {
    setSearch(val);
    fetchWeather(val);
    handleBlur();
  };

  const handleFocus = () => {
    setIsShowAutocomplete(true);
  };

  const handleBlur = () => {
    setIsShowAutocomplete(false);
  };

  useOutsideClick(ref, handleBlur);

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <div className={styles.search}>
        <input
          placeholder="Change city"
          onFocus={handleFocus}
          onChange={handleChange}
          value={search}
          type="text"
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </div>
      {!!isShowAutocomplete && (
        <div className={styles.popup}>
          {autocomplete.length ? (
            autocomplete.map(({ properties: { city, country, country_code } }, key) => (
              <div key={key} className={styles.popupItem} onClick={handleClick(city)}>
                <div>
                  <span>
                    {city}, {country}
                  </span>
                  <img
                    src={`https://openweathermap.org/images/flags/${country_code}.png`}
                    alt="country"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.popupItem}>No Result</div>
          )}
        </div>
      )}
    </form>
  );
};
