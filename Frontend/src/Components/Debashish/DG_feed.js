import React, { useState, useEffect } from "react";
import DG_addPost from "./DG_addPost";
import DG_Location from "./DG_location";
import DG_Post from "./DG_Post";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //posts
  const [posts, setPosts] = useState([
    {
      _id: 1,
      title: {
        tag: "",
        text: "New topic",
        className: "",
      },
      category: "General",
      content: [
        {
          tag: "",
          text: "NIcely working",
          className: "",
          template: "",
        },
        {
          tag: "",
          text: "you you",
          className: "",
          template: "",
        },
      ],
      location: "Dibrugarh University",
      recogniser: "#",
      likedUsers: [],
      reportedUsers: [],
      username: "Mithical",
      uploadTime: "00;00;00",
      comments: [
        {
          name: "Mathew",
          comment: "Nice",
        },
        {
          name: "anonymous",
          comment: "It's a nice one",
        },
      ],
    },
    {
      _id: 2,
      title: {
        tag: "",
        text: "New topic",
        className: "",
      },
      category: "Rumour",
      content: [
        {
          tag: "",
          text: "NIcely working",
          className: "",
          template: "",
        },
      ],
      location: "Dibrugarh University",
      recogniser: "#",
      likedUsers: [],
      reportedUsers: [],
      username: "Mithical",
      uploadTime: "00;00;00",
      comments: [
        {
          name: "Mathew",
          comment: "Nice",
        },
        {
          name: "anonymous",
          comment: "It's a nice one",
        },
      ],
    },
  ]);

  useEffect(() => {
    const loc = Cookies.get("dg_location");
    if (loc != null) setUserLocation(loc);

    const isLoggedInCookie = Cookies.get("isLoggedIn");
    if (isLoggedInCookie == "true") setIsLoggedIn(true);
  }, []);

  const postsContainer = () => {
    return (
      <>
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
          <span style={{ width: "50%" }}>{userLocation}</span>
          {/* addpost  */}
          <button
            onClick={() => {
              toggleAddPost(true);
            }}
            className="dg-r-sm-p-btn dg-center dg-feed-add-btn"
            disabled={!isLoggedIn}
          >
            <MdAdd />
          </button>
          <button className="dg-r-sm-p-btn dg-center dg-feed-add-btn">
            <MdFeedback />
          </button>
        </div>

        {/* posts  */}
        <div>
          <DG_Post posts={posts} setPosts={setPosts} />
        </div>
      </>
    );
  };

  return (
    <div>
      {addPostToggler && (
        <DG_addPost
          toggleAddPost={toggleAddPost}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      {locationToggler && (
        <DG_Location
          toggleLocation={toggleLocation}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />
      )}
      {/* logo, location, apppost, feedback or report */}
      {!(addPostToggler || locationToggler) && <>{postsContainer()}</>}
    </div>
  );
}

export default React.memo(DG_feed);
