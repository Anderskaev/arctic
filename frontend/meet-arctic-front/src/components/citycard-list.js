import { Link } from "react-router";

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
const getTempColor = (temp) => {
  if (temp <= -70) return 'var(--arctic-900)';
  if (temp <= -60) return 'var(--arctic-800)';
  if (temp <= -50) return 'var(--arctic-700)';
  if (temp <= -40) return 'var(--arctic-600)';
  if (temp <= -30) return 'var(--arctic-500)';
  if (temp <= -20) return 'var(--arctic-400)';
  //return 'var(--arctic-300)'; // Для "теплой" погоды (выше нуля)
};

export default function CityCardList({ children }) {

  const maxPopulation = Math.max(...children.map(city => city.population));


  return (
    <>

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
    </>
  );
}