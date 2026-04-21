

//  <Link to={"/card/" + city.id} key={city.id} style={{ textDecoration: 'none', color: 'inherit' }} >
//   <div className="card" style={{ display: "flex" }}>
//     {cityImage(city)}
//     <p>
//       <strong>{city.name}</strong><br />
//       <span>{city.descr}</span>
//     </p>
//   </div>
// </Link> 

import { getTempColor } from "./functions";
import { useNavigate } from 'react-router'

export default function CityListTable({ children }) {
  const navigate = useNavigate();
  const maxPopulation = Math.max(...children.map(city => city.population));


  return (
    <>
        <div className="table-wrap">
          <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>                  
                  <th>Lowest Temp (°C)</th>
                  <th>Avg Temp (°C)</th>
                  <th>Population</th>
                  <th>Latitude</th>
                </tr>
              </thead>
              <tbody>
      {children.map((city) => {
        const widthPercentage = (city.population / maxPopulation) * 100;
        return (
          //<NavLink  to={`/card/${city.id}`} style={{ textDecoration:"none", cursor:"pointer", display: 'contents'  }}> 
          <tr key={city.id} onClick={() => navigate(`/card/${city.id}`)} style={{ cursor:"pointer" }}>
            <td><b>{city.name}</b></td>
            <td>{city.country}</td>
            <td><span className="temp-badge"
              style={{
                background: getTempColor(city.lowTemp),
                
                color: city.lowTemp < -20 ? '#fff' : 'var(--arctic-800)'
              }}
            >{city.lowTemp}</span>
            </td>
            <td><span className="temp-badge"
              style={{
                background: getTempColor(city.avgTemp),
                
                color: city.avgTemp < -20 ? '#fff' : 'var(--arctic-800)'
              }}
            >{city.avgTemp}</span>
            
            </td>
            <td>
              <div className="pop-bar-wrap">
                <div className="pop-bar"
                  style={{ width: `${widthPercentage}%` }}></div>
                {city.population.toLocaleString()}
              </div>
            </td>
            <td>{city.latitude}</td>
            
          </tr>
          //</NavLink>
        )
      })}
          </tbody>
        </table>
       </div> 
    </>
  );
}