import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa";
import Cookies from "js-cookie";
import "./styles/dg_location.css";
import { FaBackspace } from "react-icons/fa";

const DG_location = ({ toggleLocation, userLocation, setUserLocation }) => {
  const [inputLocation, setInputLocation] = useState("");
  const [locationList, setLocationList] = useState([
    "Global",
    "Jorhat Engineering College",
    "Jorhat Institute of Science and Technology",
    "Jayanta Boruah College",
    "Dibrugarh University",
    "Cotton University",
    "Guwahati University",
    "Tezpur University",
  ]);

  //searchHandler
  const searchHandler = (item) => {
    for (let i = 0; i < inputLocation.length; i++) {
      if (inputLocation.toUpperCase() != item[i].toUpperCase()) return false;
    }
    return true;
  };

  const displayLocations = () => {
    return (
      <ul>
        {locationList.map((item, index) => {
          if (
            inputLocation == "" ||
            inputLocation == null ||
            inputLocation == undefined
          ) {
            return (
              <div className="dg-search-list">
                <span style={{ display: "flex" }}>
                  <FaBuilding />
                  &nbsp;
                  <li
                    key={index}
                    onClick={() => {
                      setUserLocation(item);
                      toggleLocation(false);
                      Cookies.set("dg_location", item);
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
                      setUserLocation(item);
                      toggleLocation(false);
                      Cookies.set("dg_location", item);
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
      </ul>
    );
  };
  return (
    <div className="dg-location-container animated fadeInDown">
      <div className="dg-location-header">
        <span
          onClick={() => {
            toggleLocation(false);
          }}
        >
          <FaBackspace />
        </span>
        <input
          value={inputLocation}
          onChange={(e) => {
            setInputLocation(e.target.value);
          }}
          placeholder="Search here... "
        ></input>
      </div>
      {displayLocations()}
    </div>
  );
};

export default DG_location;
