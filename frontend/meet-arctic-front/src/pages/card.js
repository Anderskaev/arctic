import { useParams } from 'react-router'
import { useEffect, useState } from 'react';

export default function Card({cities, countries}) {
    const { id } = useParams()   
    const [data, setData] = useState([]);

  useEffect(()=>{
    const LoadCities = async () => {
      const citiesList = cities.filter(ct => ct.id === Number(id)).map((city)=>{
        return {...city}
      });
      setData(citiesList);
    }
    LoadCities();
  }, [id, cities]);

    return (
        <>
        { data.map((city) => (
            <div key={city.id}>
                {city.name}
            </div>
        ))}
        </>
    );
}