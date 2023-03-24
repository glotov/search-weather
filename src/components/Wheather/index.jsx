import React from 'react';
import styles from './style.scss';

const getCelsius = (val) => (val - 273.15).toFixed(2);

const WheatherItem = (props) => {
  const country = props?.sys?.country.toLowerCase();
  return (
    <div className={styles.card}>
      {props.weather.map((el) => (
        <>
          <div key={el.id}>
            <img
              className={styles.image}
              src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
            />
          </div>
          <div>
            <div>
              <span>{props.name}</span>
              <img src={`https://openweathermap.org/images/flags/${country}.png`} />
              <span>{el.description}</span>
            </div>
            <div>
              temperature {getCelsius(props.main.temp_min)}&#8451; to{' '}
              {getCelsius(props.main.temp_max)}&#8451; (feels like):{' '}
              {getCelsius(props.main.feels_like)}&#8451;, wind: {props.wind.speed} m/s, clouds:{' '}
              {props.clouds.all} %, {props.main.pressure} hpa
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export const Wheather = ({ list }) => {
  return (
    <div className={styles.container}>
      {list.map((el) => (
        <WheatherItem key={el.id} {...el} />
      ))}
    </div>
  );
};
