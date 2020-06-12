import React, { useState, useEffect } from "react";
import DG_AddPost_Editor from "./AddPost/DG_AddPost_Editor";
import DG_Location from "./DG_location";
import DG_Post from "./DG_Post";
import Cookies from "js-cookie";
import "./styles/pattern.min.css";
import "./styles/dg_background_template.css";
import "./styles/dg_templates.css";
import "./styles/dg_common.css";
import "./styles/dg_feed.css";
import { MdLocationOn, MdAdd, MdFeedback } from "react-icons/md";
import axios from "axios";
import { isMobile } from "react-device-detect";
import Loader from "../Loader";

function DG_feed() {
  useEffect(() => {
    Cookies.set("_user_id", "5ebd3edf5508ca9bb2ad2ea2"); //{expires : 7}
    Cookies.set("username", "testuser"); //{expires : 7}
    Cookies.set("name", "Test User");
    Cookies.set("location", "Global");
    Cookies.set("isLoggedIn", "true");
  }, []);

  const path = "https://my-fling.herokuapp.com";
  const locations = [
    "Global",
    "Dibrugarh",
    "Jorhat",
    "Guwahati",
    "Tinsukia",
    "Sivasagar",
    "Naharkatia",
    "Namrup",
    "Lakhimpur",
  ];

  const [addPostToggler, toggleAddPost] = useState(false);
  const [locationToggler, toggleLocation] = useState(false);
  const [postsLocation, setPostsLocation] = useState("Global");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayLoadMore, setDisplayLoadMore] = useState({ display: "none" });
  const [dgview, setDgview] = useState("mobile");
  //userdetails
  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    userId: "",
    location: "",
  });

  //posts
  const [posts, setPosts] = useState([]);

  const postsDataHandler = (replace) => {
    axios
      .post(`${path}/feed/${postsLocation}`, { pageNumber: pageNumber })
      .then((res) => {
        if (!replace) {
          setPosts(posts.concat(res.data));
        } else setPosts(res.data);
        if (res.data.length < 10) setDisplayLoadMore({ display: "none" });
        else setDisplayLoadMore({ display: "block" });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const loc = Cookies.get("dg_location");
    if (loc != null) setPostsLocation(loc);

    const isLoggedInCookie = Cookies.get("isLoggedIn");
    if (isLoggedInCookie == "true") setIsLoggedIn(true);

    const username = Cookies.get("username");
    const name = Cookies.get("name");
    const location = Cookies.get("location");
    const userId = Cookies.get("_user_id");

    setUserDetails({
      username: username,
      name: name,
      location: location,
      userId: userId,
    });

    postsDataHandler(true);

    if (isMobile) setDgview("mobile");
    else setDgview("desktop");
  }, []);

  useEffect(() => postsDataHandler(false), [pageNumber]);
  useEffect(() => postsDataHandler(true), [postsLocation]);

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
          <span style={{ width: "50%" }}>{postsLocation}</span>
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

        <DG_Post
          dgview={dgview}
          userId={userDetails.userId}
          posts={posts}
          setPosts={setPosts}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          displayLoadMore={displayLoadMore}
        />
      </>
    );
  };

  return (
    <div className={`dg-${dgview}-grid`}>
      {addPostToggler && (
        <DG_AddPost_Editor
          toggleAddPost={toggleAddPost}
          posts={posts}
          setPosts={setPosts}
          userDetails={userDetails}
          locations={locations}
        />
      )}
      {locationToggler && (
        <DG_Location
          toggleLocation={toggleLocation}
          postsLocation={postsLocation}
          setPostsLocation={setPostsLocation}
          locationList={locations}
        />
      )}
      {/* logo, location, apppost, feedback or report */}
      {!(addPostToggler || locationToggler) && <>{postsContainer()}</>}
    </div>
  );
}

export default React.memo(DG_feed);
