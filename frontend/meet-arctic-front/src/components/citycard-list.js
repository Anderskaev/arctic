import { Link } from "react-router";

function cityImage(city) {

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


  export default function CityCardList( {children} ) {
    return (
        <>
        {children.map((city)=>(
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
      </>
    );
  }