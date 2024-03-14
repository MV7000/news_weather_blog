import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Marquee from 'react-fast-marquee';

import { dataGet } from '../../functions/dataGet';
import sunIcon from '../../assets/images/lutsk/sunIcon.png';
import windIcon from '../../assets/images/lutsk/windIcon.png';
import windyIcon from '../../assets/images/lutsk/windyIcon.png';
import rainIcon from '../../assets/images/lutsk/rainIcon.png';
import cloudIcon from '../../assets/images/lutsk/cloudIcon.png';

import '@splidejs/react-splide/css/sea-green';
import './Weather.css';
import { readDatabase } from '../../functions/firestore/getData';
import { ref } from 'firebase/storage';
import { db } from '../../functions/firestore/firestore';

const {
  VITE_WEATHER_URL,
  VITE_X_WEATHER_RAPID_KEY,
  VITE_X__WEATHER_RAPIDAPI_HOST,
} = import.meta.env;

export default function Weather() {
  const [dataWeather, setDataWeather] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);
  const imagesArrRef = ref(db, 'slider/');

  const wihoutDataText = 'Error data request.Try again later';
  const options = {
    method: 'GET',
    url: VITE_WEATHER_URL,
    params: { q: '50.9 25.6' },
    headers: {
      'X-RapidAPI-Key': VITE_X_WEATHER_RAPID_KEY,
      'X-RapidAPI-Host': VITE_X__WEATHER_RAPIDAPI_HOST,
    },
  };

  useEffect(() => {
    dataGet(options, setDataWeather);
    readDatabase(setImagesArr, imagesArrRef);
  }, []);

  return (
    <div className='container'>
      <h1 className='merriweather-black-italic  '>Place that i love - LUTSK</h1>
      <p className='textAboutCity merriweather-light-italic'>
        The heart of Volyn is Lutsk, one of the most ancient, mysterious and
        charming cities in Ukraine. It is well known for its rich history, which
        determined the city’s appearance. Today, Lutsk manages to harmoniously
        combine the monumentality of Soviet architecture with the grace of
        ancient buildings that continue to preserve Kyivan Rus’ and Medieval
        Europe’s spirit.
      </p>
      <div className='sliderWrapper'>
        <Splide
          options={{
            autoplay: true,
            drag: 'free',
            type: 'loop',
            focus: 'center',
            pagination: false,
            height: '300px',
            width: '100%',
            perMove: 1,
            perPage: 3,
            speed: 1000,
            interval: 4000,
          }}
          aria-label='My Favorite Images'
        >
          {imagesArr.map(elem => {
            return (
              <SplideSlide key={elem.name}>
                <div className='slideImageWrapper'>
                  <img
                    src={elem.url}
                    alt={elem.name}
                    width={300}
                    height={300}
                  />
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <div className='weatherContainer'>
        <h2 className='merriweather-light-italic'>
          The weather in Lutsk on{' '}
          {dataWeather ? dataWeather.current.last_updated : wihoutDataText}
        </h2>
        <div className='weatherWrapper'>
          <div className='stateWeatherWrapper'>
            <img
              src={
                dataWeather
                  ? dataWeather.current.condition.icon
                  : wihoutDataText
              }
              width={65}
              height={65}
              alt='weatherIcon'
            />
            <p className='merriweather-light-italic'>
              Weather condition:{' '}
              {dataWeather
                ? dataWeather.current.condition.text
                : wihoutDataText}
            </p>
          </div>
          <Marquee direction='right'>
            <div className='additionalWeatherData merriweather-bold-italic'>
              Temperature:
              {dataWeather ? dataWeather.current.temp_c : wihoutDataText}&deg;C
              <img src={sunIcon} alt='sunIcon' />
              Feels like:
              {dataWeather ? dataWeather.current.feelslike_c : wihoutDataText}
              &deg;C
              <img src={sunIcon} alt='sunIcon' />
              Humidity:{' '}
              {dataWeather ? dataWeather.current.humidity : wihoutDataText}%
              <img src={rainIcon} alt='rainIcon' />
              Atmospheric pressure:{' '}
              {dataWeather
                ? dataWeather.current.pressure_in
                : wihoutDataText}{' '}
              inches of mercury
              <img src={windIcon} alt='windIcon' />
              Wind direction:{' '}
              {dataWeather ? dataWeather.current.wind_dir : wihoutDataText}
              <img src={cloudIcon} alt='cloudIcon' />
              Wind power:
              {dataWeather ? dataWeather.current.wind_kph : wihoutDataText}kph
              <img src={windyIcon} alt='windyIcon' />
            </div>
          </Marquee>
        </div>
        <h3 className='merriweather-light-italic'>
          Have a nice day in our beautiful city!:)
        </h3>
      </div>
    </div>
  );
}
