import React, { useState, useEffect } from "react";
import DG_EachPost from "./DG_EachPost";
import "./styles/dg_post.css";
import Cookies from "js-cookie";
import axios from "axios";
import BlockRenderer from "./BlockRenderer/BlockRenderer";

const DG_Post = ({ posts, setPosts }) => {
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
            // <DG_EachPost
            //   key={item._id}
            //   index={posts.length - index - 1}
            //   post={item}
            //   likeHandler={likeHandler}
            //   reportHandler={reportHandler}
            //   isLoggedIn={isLoggedIn}
            // />
            <BlockRenderer key={index} data={item} />
          );
        })}
    </div>
  );
};

export default React.memo(DG_Post);
