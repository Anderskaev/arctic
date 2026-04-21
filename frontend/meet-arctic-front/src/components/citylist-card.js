import { NavLink } from 'react-router'
import { getTempColor } from "./functions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faTemperatureFull } from '@fortawesome/free-solid-svg-icons'

export default function CityListCard({ children }) {

    return (
        <>
            <div className="city-grid">
                {children.map((city) => {
                    return (
                        <NavLink key={city.id} to={`/card/${city.id}`} style={{ textDecoration:"none", cursor:"pointer" }}>
                        <div className="city-thumb city-thumb-body">
                            <div className="city-thumb-name">{city.name}</div>
                            <div className="city-thumb-meta">{city.country}</div>
                            <div className="city-thumb-temp"><span className="temp-badge"
                                style={{
                                    width: "100%",
                                    background: getTempColor(city.lowTemp),
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: city.lowTemp < -20 ? '#fff' : 'var(--arctic-800)'
                                }}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faTemperatureFull} />
                                    Lowest: {city.lowTemp}°&nbsp;C
                                </div>
                                <div>
                                    Average: {city.avgTemp}°&nbsp;C
                                </div>
                            </span>

                            </div>
                            <div className="city-thumb-meta"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div><FontAwesomeIcon icon={faUser} />{city.population.toLocaleString()}</div>
                                <div><FontAwesomeIcon icon={faLocationDot} />{city.latitude}°&nbsp;N</div>
                            </div>
                        </div>
                        </NavLink>
                    )
                })};
            </div>
        </>
    )
}