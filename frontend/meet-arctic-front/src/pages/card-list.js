import { useEffect, useMemo, useRef, useState } from "react";
//import { cities, countries as cntr } from '../mock/data.ts'
import { Link } from "react-router";

export default function CardList() {
  const STEP = 10; 
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(STEP);
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [countries, setCountries] = useState([]);

  useEffect(()=>{
    const LoadCities = async () => {

      const response = await fetch("./public/data.json");
      const d = await response.json();

      const cntr_response = d.countries;
      const city_response = d.cities;
      setCountries(cntr_response); 
      const countryDict = Object.fromEntries(cntr_response.map(c => [c.id, c.name]));

      const citiesList = city_response
        .map((city)=>{
          return {...city, country: countryDict[city.id_country] || 'Неизвестно'}
          })
        .sort((a, b) => a.name.localeCompare(b.name));
      setData(citiesList);
    }
    LoadCities();
  }, []);

  const filteredCities = useMemo(()=>{
    return data.filter((d)=>{
        const queryFilter = d.name.toLowerCase().startsWith(query.toLowerCase());
        const countryFilter =  selectedCountryId !== 0 ? d.id_country === selectedCountryId: true;
      return queryFilter&&countryFilter;
    });
  },[data, query, selectedCountryId]);  

  const visibleItems = filteredCities.slice(0, limit);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setLimit(STEP); 
  };

    const loaderRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && limit < filteredCities.length) {
      setLimit(prev => prev + STEP);
    }
  }, { threshold: 1.0 });

  if (loaderRef.current) observer.observe(loaderRef.current);
  
  return () => observer.disconnect();
}, [limit, filteredCities.length]);


  const cityImage = (city) => {

    const placeholder = "./public/placeholder.png";
    const cityImg = `./public/cities/${city.id}.png`;

    return (
      <img 
        src={cityImg} 
        width="100" 
        height="100" 
        alt={city.name}

        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = placeholder;
        }}
      />
    );
  };

  return (
    <>
    <form>
      <input
        value={query}
        onChange={handleSearch}
      />

        <select 
          value={selectedCountryId} 
          onChange={(e) => setSelectedCountryId(Number(e.target.value))}
        >
          <option value={0}>Все страны</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
    </form>

    {visibleItems.map((city)=>(
      <Link to={"/card/"+city.id} key={city.id} style={{ textDecoration: 'none', color: 'inherit' }} >
      <div className="card" style={{display: "flex"}}>
        {cityImage(city)}
        <p>
          <strong>{city.name}</strong><br/>
          <span>{city.descr}</span>
        </p>
      </div>
      </Link>
      ))}

      <div ref={loaderRef} style={{ height: '20px' }}>
        {limit < filteredCities.length ? 'Загрузка...' : 'Это все данные'}
      </div>

      {/* {limit < filteredCities.length && (
        <>

          <button onClick={() => setLimit(prev => prev + STEP)}>
            Показать еще (осталось {filteredCities.length - limit})
          </button>
        </>        
      )} */}
    </>
  );
}