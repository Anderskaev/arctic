import { useParams } from 'react-router'
import { useEffect, useState } from 'react';
import { cityImage, formatLatitude, formatLongitude, formatPop } from '../components/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Card({ cities, countries }) {
  const { id } = useParams()
  const [data, setData] = useState([]);

  useEffect(() => {
    const LoadCities = async () => {
      const citiesList = cities.filter(ct => ct.id === Number(id)).map((city) => {
        return { ...city }
      });
      setData(citiesList);
    }
    LoadCities();
  }, [id, cities]);

  return (
    <>
      {data.map((city) => (
        <div key={city.id}>

          <div className="postcard">
            <div className="postcard-bg">
              {cityImage(city,"postcard-img")}
            </div>
            <div className="postcard-coords">{formatLatitude(city.latitude)}, {formatLongitude(city.longitude)}</div>
            <div className="postcard-info">
              <div className="postcard-city">{city.name}</div>
              <div className="postcard-country">{city.country} · <FontAwesomeIcon icon={faUser} /> {formatPop(city.population)}</div>
            </div>
          </div>



        </div>
      ))}
    </>
  );
}