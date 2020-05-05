import React, { useState, useEffect } from "react";
import DG_addPost from "./DG_addPost";
import DG_Location from "./DG_location";
import Cookies from "js-cookie";
import "./styles/pattern.min.css";
import "./styles/dg_background_template.css";
import "./styles/dg_templates.css";
import "./styles/dg_common.css";
import "./styles/dg_feed.css";
import { MdLocationOn, MdAdd, MdFeedback } from "react-icons/md";

function DG_feed() {
  const [addPostToggler, toggleAddPost] = useState(false);
  const [locationToggler, toggleLocation] = useState(false);
  const [userLocation, setUserLocation] = useState("Global");

  useEffect(() => {
    const loc = Cookies.get("dg_location");
    if (loc != null) setUserLocation(loc);
  }, []);
  return (
    <div>
      {addPostToggler && <DG_addPost toggleAddPost={toggleAddPost} />}
      {locationToggler && (
        <DG_Location
          toggleLocation={toggleLocation}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />
      )}
      {/* logo, location, apppost, feedback or report */}
      <div className="dg-feed-header">
        {/* location  */}
        <button
          onClick={() => {
            toggleLocation(true);
          }}
          className="dg-r-sm-p-btn dg-center dg-feed-loc-btn"
        >
          <MdLocationOn />
        </button>{" "}
        {userLocation}
        {/* addpost  */}
        <button
          onClick={() => {
            toggleAddPost(true);
          }}
          className="dg-r-sm-p-btn dg-center dg-feed-add-btn"
        >
          <MdAdd />
        </button>
        <button className="dg-r-sm-p-btn dg-center dg-feed-add-btn">
          <MdFeedback />
        </button>
      </div>
    </div>
  );
}

export default DG_feed;
