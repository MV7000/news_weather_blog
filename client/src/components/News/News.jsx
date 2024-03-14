import React, { useEffect, useState } from 'react';

import { dataGet } from '../../functions/dataGet';
import './News.css';

const { VITE_NEWS_URL, VITE_X_RAPIDAPI_HOST, VITE_X_RAPID_KEY } = import.meta
  .env;

export default function News() {
  const [dataNews, setDataNews] = useState(null);
  const [country, SetCountry] = useState('uk');
  const options = {
    method: 'GET',
    url: VITE_NEWS_URL,
    params: {
      country: 'uk',
      language: country,
      pageSize: '10',
      category: 'politic',
    },
    headers: {
      'X-RapidAPI-Key': VITE_X_RAPID_KEY,
      'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST,
    },
  };

  useEffect(() => {
    dataGet(options, setDataNews);
  }, [country]);
  return (
    <div className='container'>
      <h1 className='merriweather-black-italic'>
        Top News on{' '}
        {new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </h1>
      <div className='newsWrapper merriweather-black-italic'>
        <table>
          <thead>
            <tr>
              <th className='merriweather-black-italic'>Publisher Name</th>
              <th className='merriweather-black-italic'>Article title</th>
            </tr>
          </thead>
          <tbody>
            {dataNews?.articles.map(elem => {
              return (
                <tr key={elem.published_date}>
                  <td className='merriweather-regular-italic'>
                    {elem.publisher.name}
                  </td>
                  <td className='merriweather-regular-italic'>
                    <a href={elem.url} target='blank'>
                      {elem.title}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='btnNewsWrapper'>
          <input
            type='checkbox'
            name='checkCountry'
            id='checkCountry'
            onChange={() =>
              country === 'uk'
                ? SetCountry(prev => 'en')
                : SetCountry(prev => 'uk')
            }
          />
        </div>
      </div>
    </div>
  );
}
