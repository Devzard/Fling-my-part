import React, { useState, useEffect } from "react";
import "./styles/dg-location.css";
import { FiSearch } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import Cookies from "js-cookie";

function Location(props) {
  const [inputLoc, setInputLoc] = useState("");
  const [locations, setLocations] = useState(props.locations);
  const [searchTog, setSearchTog] = useState(false);
  const [currentLoc, setCurrentLoc] = useState(locations[0]);

  //searchHandler
  const searchHandler = (item) => {
    for (let i = 0; i < inputLoc.length; i++) {
      if (inputLoc.toUpperCase() != item[i].toUpperCase()) return false;
    }
    return true;
  };

  const displayLocations = () => {
    return (
      <>
        {locations.map((item, index) => {
          if (inputLoc == "" || inputLoc == null || inputLoc == undefined) {
            return (
              <div className="dg-search-list">
                <span style={{ display: "flex" }}>
                  <FaBuilding />
                  &nbsp;
                  <li
                    key={index}
                    onClick={() => {
                      setCurrentLoc(item);
                      setSearchTog(false);
                      Cookies.set("dg-location", item);
                    }}
                  >
                    {item}
                  </li>
                </span>
                <br />
                <hr />
              </div>
            );
          } else if (searchHandler(item)) {
            return (
              <div className="dg-search-list">
                <span style={{ display: "flex" }}>
                  <FaBuilding />
                  &nbsp;
                  <li
                    key={index}
                    onClick={() => {
                      setCurrentLoc(item);
                      setSearchTog(false);
                      Cookies.set("dg-location", item);
                    }}
                  >
                    {item}
                  </li>
                </span>
                <br />
                <hr />
              </div>
            );
          }
        })}
      </>
    );
  };

  useEffect(() => {
    Cookies.set("dg-location", currentLoc);
  }, []);

  return (
    <div>
      <label className="dg-search" onClick={() => setSearchTog(true)}>
        <FiSearch />
      </label>
      <span>{currentLoc}</span>
      {searchTog && (
        <span className="dg-location-search animated fadeInLeft">
          <span
            onClick={() => {
              setSearchTog(false);
            }}
          >
            X &nbsp;
          </span>
          <input
            value={inputLoc}
            onChange={(e) => {
              setInputLoc(e.target.value);
            }}
            placeholder="Search here .. "
            className="animated fadeIn dg-search-bar"
          ></input>
          <ul>{displayLocations()}</ul>
        </span>
      )}
    </div>
  );
}

export default Location;
