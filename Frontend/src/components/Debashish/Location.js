import React, { useState } from "react";
import "./styles/dg-location.css";
import { FiSearch } from "react-icons/fi";

function Location(props) {
  const [locations, setLocations] = useState(props.locations);
  const [searchTog, setSearchTog] = useState(false);
  const [currentLoc, setCurrentLoc] = useState(locations[0]);
  const displayLocations = () => {
    return (
      <ul>
        {locations.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  };
  return (
    <div>
      <label className="dg-search" onClick={() => setSearchTog(!searchTog)}>
        <FiSearch />
      </label>
      <span>{currentLoc}</span>
      {searchTog && (
        <span className="dg-location-search animated fadeInLeft">
          <input className="animated fadeIn dg-search-bar"></input>
          {displayLocations()}
        </span>
      )}
    </div>
  );
}

export default Location;
