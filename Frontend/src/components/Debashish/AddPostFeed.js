import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { GiSplitCross } from "react-icons/gi";
import { GrSend } from "react-icons/gr";
import "./styles/dg-addpost.css";
import Cookies from "js-cookie";

function AddPostFeed(props) {
  const [formTog, setFormTog] = useState(false);
  const [locations, setLocations] = useState(props.locations);
  const [currentLoc, setCurrentLoc] = useState("");

  const addform = () => {
    console.log(Cookies.get("dg-location"));
    return (
      <div className="dg-form animated fadeInDown">
        <form>
          <label>Category</label>
          <select>
            <option>General</option>
            <option>Rumour</option>
            <option>Event</option>
          </select>
          <label>Content</label>
          <textarea required></textarea>

          <label></label>
        </form>
        <div className="dg-btns">
          <span className="dg-send-btn dg-plus">
            <GrSend />
          </span>
          <span
            className="dg-cancel-btn dg-plus"
            onClick={() => setFormTog(false)}
          >
            <GiSplitCross />
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {" "}
      {formTog ? (
        addform()
      ) : (
        <span
          className="dg-plus animated"
          onClick={() => {
            setFormTog(!formTog);
          }}
        >
          <IoIosAdd />
        </span>
      )}
    </>
  );
}

export default React.memo(AddPostFeed);
