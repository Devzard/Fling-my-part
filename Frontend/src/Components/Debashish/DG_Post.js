import React, { useState, useEffect } from "react";
import DG_EachPost from "./DG_EachPost";
import "./styles/dg_post.css";
import Cookies from "js-cookie";
import axios from "axios";

const DG_Post = ({ posts, setPosts }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //gets called on like
  const likeHandler = (index, userId) => {
    let newPosts = [...posts];
    newPosts[index].likedUsers.push(userId);
    setPosts(newPosts);
  };
  //gets called on report
  const reportHandler = (userId) => {
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
      {posts
        .slice(0)
        .reverse()
        .map((item, index) => {
          return (
            <DG_EachPost
              key={item._id}
              index={posts.length - index - 1}
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
