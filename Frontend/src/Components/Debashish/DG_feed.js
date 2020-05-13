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
import axios from "axios";

function DG_feed() {
  const path = "https://my-fling.herokuapp.com";
  const [addPostToggler, toggleAddPost] = useState(false);
  const [locationToggler, toggleLocation] = useState(false);
  const [postsLocation, setPostsLocation] = useState("Global");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayLoadMore, setDisplayLoadMore] = useState({ display: "block" });
  //userdetails
  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    userId: "",
    location: "",
  });

  //posts
  const [posts, setPosts] = useState([]);

  const postsDataHandler = () => {
    axios
      .post(`${path}/feed/${postsLocation}`, { pageNumber: pageNumber })
      .then((res) => {
        setPosts(res.data);
        if (res.data.length < 10) setDisplayLoadMore({ display: "none" });
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

    postsDataHandler();
  }, []);

  useEffect(() => postsDataHandler(), [postsLocation, pageNumber]);

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
        <div>
          <DG_Post posts={posts} setPosts={setPosts} />
        </div>

        {/* load more  */}
        <button
          style={displayLoadMore}
          className="dg-btn"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Load More
        </button>
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
          userDetails={userDetails}
        />
      )}
      {locationToggler && (
        <DG_Location
          toggleLocation={toggleLocation}
          postsLocation={postsLocation}
          setPostsLocation={setPostsLocation}
        />
      )}
      {/* logo, location, apppost, feedback or report */}
      {!(addPostToggler || locationToggler) && <>{postsContainer()}</>}
    </div>
  );
}

export default React.memo(DG_feed);
