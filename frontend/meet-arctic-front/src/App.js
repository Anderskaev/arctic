import './App.css';
import { Routes, Route } from 'react-router'
import Card from './pages/card';
import CardList from './pages/card-list';
import Home from './pages/front-page';
import Navbar from './components/navbar';
import NotFound from './pages/404';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const LoadCities = async () => {

      const response = await fetch("/public/data.en.json");
      const rdata = await response.json();

      setCountries(rdata.countries);
      const countryDict = Object.fromEntries(rdata.countries.map(c => [c.id, c.name]));
      const citiesList = rdata.cities
        .map((city) => {
          return { ...city, country: countryDict[city.id_country] || 'Неизвестно' }
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setCities(citiesList);

    }
    LoadCities();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cities={cities} countries={countries}/>} />
        <Route path="/cardlist" element={<CardList cities={cities} countries={countries}/>} />
        <Route path="/card/:id" element={<Card cities={cities} countries={countries}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
