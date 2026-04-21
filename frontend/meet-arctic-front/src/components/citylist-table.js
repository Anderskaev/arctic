// function cityImage(city) {

//   const placeholder = "./public/placeholder.png";
//   const cityImg = `./public/cities/${city.id}.png`;

//   return (
//     <img
//       src={cityImg}
//       widtd="100"
//       height="100"
//       alt={city.name}

//       onError={(e) => {
//         e.target.onerror = null;
//         e.target.src = placeholder;
//       }}
//     />
//   );
// };
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

export default function CityListTable({ children }) {

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
          <tr key={city.id}>
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
        )
      })}
          </tbody>
        </table>
       </div> 
    </>
  );
}