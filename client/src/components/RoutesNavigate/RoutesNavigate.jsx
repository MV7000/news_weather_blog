import React, { useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';

import './RoutesNavigate.css';
import { markers } from './Markers/markers';

const libraries = ['places'];

const containerStyle = {
  width: '100vw',
  height: '64.4vh',
  borderRadius: '12px',
};

const center = {
  lat: 50.7489, //Центральний вокзал
  lng: 25.3233,
};

function RoutesNavigate() {
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const onLoad = React.useCallback(function callback(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitudeCurrent = position.coords.latitude;
        const longitudeCurrent = position.coords.longitude;
        setLat(latitudeCurrent);
        setLong(longitudeCurrent);
      });
    }
    new google.maps.places.Autocomplete(document.getElementById('destin'), {
      types: ['geocode'],
    });
    new google.maps.places.Autocomplete(document.getElementById('origin'), {
      types: ['geocode'],
    });
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,

      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = 'Lutsk, Volyn Oblast, Ukraine';
  }

  const homeReturn = () => {
    map.panTo(center);
  };

  const handleMarker = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return isLoaded ? (
    <div className='container'>
      <div className='contactWrapper'>
        <div className='googleMapContainer'>
          <div className='mapWrapper'>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {markers.map(({ id, title, position }) => {
                return (
                  <MarkerF
                    key={id}
                    onClick={() => handleMarker(id)}
                    position={position}
                    title={title}
                  >
                    {activeMarker === id ? (
                      <InfoWindowF>
                        <div>{title}</div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                );
              })}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </div>
          <div className='recvisiteWrapper'>
            <h1 className='merriweather-black-italic'>💖Welcome to LUTSK💖</h1>
            <h2 className='merriweather-black-italic'>Our coordinates:</h2>
            <div className='btnHomeBackWrapper'>
              <button type='button' className='backHome' onClick={homeReturn}>
                <ul className='merriweather-regular'>
                  <li className='merriweather-black-italic'>
                    Ukraine ,43000, Lutsk
                  </li>
                  <li>Longitude: 25.325</li>
                  <li>Latitude: 50.7468</li>
                </ul>
              </button>
            </div>
            <div className='searchCityForm merriweather-black'>
              <label htmlFor='searchCity'>How fahr You are from Lutsk</label>
              <input
                type='search'
                name='searchCity'
                className='merriweather-regular'
                id='destin'
                placeholder='Enter city name'
                value={'Lutsk, Volyn Oblast, Ukraine'}
                onChange={e => e.target.value}
                ref={destinationRef}
              />
              🔰
              <input
                type='search'
                name='searchCity'
                className='merriweather-regular'
                id='origin'
                placeholder='Enter city name'
                ref={originRef}
              />
              <div className='btnRouteWrapper'>
                <button
                  className='merriweather-regular'
                  type='button'
                  onClick={clearRoute}
                >
                  Clean <span>❌</span>
                </button>
                <button
                  className='merriweather-regular'
                  type='button'
                  onClick={calculateRoute}
                >
                  Make a route<span>✔</span>
                </button>
              </div>
              {distance && duration && (
                <div className='routeInfo'>
                  <p className='merriweather-regular'>
                    💚 Distance between us is shorter than{' '}
                    <span>{distance}</span> 💚
                  </p>
                  <p className='merriweather-regular'>
                    🚗By car Your travel will last for <span>{duration}</span>🚗
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(RoutesNavigate);
