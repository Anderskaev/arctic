import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "../components/functions";
import CityListTable from "../components/citylist-table";
import CityListCard from "../components/citylist-card";

export default function CardList({ countries, cities }) {
  const STEP = 10;
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(STEP);
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const loaderRef = useRef(null);


  const filteredCities = useMemo(() => {
    return cities.filter((d) => {
      const queryFilter = d.name.toLowerCase().startsWith(query.toLowerCase());
      const countryFilter = selectedCountryId !== 0 ? d.id_country === selectedCountryId : true;
      return queryFilter && countryFilter;
    });
  }, [cities, query, selectedCountryId]);

  const visibleItems = filteredCities.slice(0, limit);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setLimit(STEP);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && limit < filteredCities.length) {
        setLimit(prev => prev + STEP);
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [limit, filteredCities.length]);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <div className="screen">
        <div className="table-toolbar">
          <div className="table-toolbar-title">Cities</div>
          <form>
            <input className="search-box"
              value={query}
              onChange={handleSearch}
            />

            <select className="search-box"
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
        </div>

              {!isMobile ? <CityListTable>{visibleItems}</CityListTable> : <CityListCard>{visibleItems}</CityListCard>}
         
          <div ref={loaderRef} style={{ height: '20px' }}>
            {limit < filteredCities.length ? 'Загрузка...' : ''}
          </div>        
      </div> {/* screen */}
    </>
  );
}