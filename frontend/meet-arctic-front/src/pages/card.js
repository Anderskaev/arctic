import { useParams } from 'react-router'
import { cities, countries } from '../mock/data.ts';
import { useEffect, useState } from 'react';

export default function Card() {
    const { id } = useParams()   
    const [data, setData] = useState([]);

  useEffect(()=>{
    const LoadCities = async () => {
      const response = cities; //await fetch ....countries also fetch
      const citiesList = response.filter(ct => ct.id === Number(id)).map((city)=>{
        return {...city, country: countries.filter(c => c.id === city.id_country)[0].name}
      });
      setData(citiesList);
    }
    LoadCities();
  }, [id]);

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