import { useMemo } from "react";
import { formatPop } from "./functions";

export default function Stats({cities}) {
     const stats = useMemo(() => {
        if (!cities || cities.length === 0) return null;
        const coldest = cities.reduce((prev, current) => (prev.lowTemp < current.lowTemp) ? prev : current);
        const largest = cities.reduce((prev, current) => (prev.population > current.population) ? prev : current);
        const northen = cities.reduce((prev, current) => (prev.latitude > current.latitude) ? prev : current);
        const count = cities.length;
        return { coldest, largest, count, northen };
      }, [cities]);
    
      if (!stats) return <div>Загрузка статистики...</div>;

      return (
        <div className="stats-row">
          <div className="stat-card">
              <div className="stat-label">Cities</div>
              <div className="stat-value">{stats.count}</div>      
              <div className="stat-sub">in the database</div>                   
          </div>

          <div className="stat-card">
              <div className="stat-label">Coldest</div>
              <div className="stat-value cold">{stats.coldest.lowTemp}°&nbsp;C</div>      
              <div className="stat-sub">{stats.coldest.name}, {stats.coldest.country}</div>     
          </div>

          <div className="stat-card">
              <div className="stat-label">Northernmost </div>
              <div className="stat-value">{stats.northen.latitude}
                </div>      
              <div className="stat-sub">{stats.northen.name}, {stats.northen.country}</div>     
          </div>

          <div className="stat-card">
              <div className="stat-label">Most populous</div>
              <div className="stat-value">{formatPop(stats.largest.population)} ppl
                {/* <NumericFormat value={stats.largest.population} displayType={'text'} thousandSeparator={' '} suffix={' ppl'} /> */}
                </div>      
              <div className="stat-sub">{stats.largest.name}, {stats.largest.country}</div>     
          </div>
        </div> 
      );
}