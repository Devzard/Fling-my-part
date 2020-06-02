import React, { useState, useEffect } from "react";
import "./styles/dg_post.css";
import Cookies from "js-cookie";
import BlockRenderer from "./BlockRenderer/BlockRenderer";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const DG_Post = ({ userId, posts, setPosts }) => {
  const [userName, setUserName] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("_user_id");
    const userN = Cookies.get("username");
    setUserName(userN);
    if (userId != null) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (userName != null) setIsLoaded(true);
    else setIsLoaded(false);
  }, [userName]);

  return (
    <div className="dg-posts-container">
      {isLoaded ? (
        <>
          {posts
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <div>
                  <BlockRenderer
                    key={index}
                    data={item}
                    userName={userName}
                    paramName={item.username}
                  />
                  <span className="dg-read-more">
                    <Link to={`/feed/post/${item._id}`}>read more..</Link>
                  </span>
                </div>
              );
            })}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default React.memo(DG_Post);
