import React, { useState, useEffect } from "react";
import DG_EachPost from "./DG_EachPost";
import "./styles/dg_post.css";
import Cookies from "js-cookie";

const DG_Post = ({ posts, setPosts }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //gets called on like
  const likeHandler = (userId, recogniser) => {
    setPosts({ ...setPosts, likedUsers: posts.likedUsers.concat(userId) });
  };
  //gets called on report
  const reportHandler = (userId, recogniser) => {
    setPosts({
      ...setPosts,
      reportedUsers: posts.reportedUsers.concat(userId),
    });
  };

  useEffect(() => {
    const userId = Cookies.get("_user_id");
    if (userId != null) setIsLoggedIn(true);
  }, []);
  return (
    <div className="dg-posts-container">
      {posts.map((item, index) => {
        return (
          <DG_EachPost
            post={item}
            likeHandler={likeHandler}
            reportHandler={reportHandler}
            isLoggedIn={isLoggedIn}
          />
        );
      })}
    </div>
  );
};

export default React.memo(DG_Post);
