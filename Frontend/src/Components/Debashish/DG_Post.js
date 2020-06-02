import React, { useState, useEffect } from "react";
import "./styles/dg_post.css";
import Cookies from "js-cookie";
import BlockRenderer from "./BlockRenderer/BlockRenderer";
import { Link } from "react-router-dom";

const DG_Post = ({ userId, posts, setPosts }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("_user_id");
    if (userId != null) setIsLoggedIn(true);
  }, []);
  return (
    <div className="dg-posts-container">
      {posts
        .slice(0)
        .reverse()
        .map((item, index) => {
          return (
            <div>
              <BlockRenderer
                key={index}
                data={item}
                userId={userId}
                paramId={null}
              />
              <span className="dg-read-more">
                <Link to={`/feed/post/${item._id}`}>read more..</Link>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(DG_Post);
