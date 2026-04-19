import { useMemo } from "react";
import Hero from "../components/hero";




export default function Home({cities, countries}) {

  const stats = useMemo(()=> {
    if (!cities || cities.length === 0) return null;
      const coldest = cities.reduce((prev, current) => (prev.lowTemp < current.lowTemp) ? prev : current);
      const largest = cities.reduce((prev, current) => (prev.population > current.population)? prev : current);
      const count = cities.length;
     return { coldest, largest, count };
  }, [cities]);

  if (!stats) return <div>Загрузка статистики...</div>;

  return (
    <>
      <p>
        <strong>
          {stats.coldest.name}
        </strong>
        <span>
        {stats.coldest.lowTemp} град. С
        </span>
      </p>      
      <p>
        <strong>
        {stats.largest.name}
        </strong>
        <span>
        {stats.largest.population} человек
        </span>
      </p>     
      <p>
        <strong>
        Нас.пунктов в БД
        </strong>
        <span>
        {stats.count}
        </span>
      </p>              
      <Hero />
    </>
  );
}