import React, { useState, useEffect } from "react";
import DG_EachPost from "./DG_EachPost";
import "./styles/dg_post.css";

const DG_Post = ({ posts, setPosts }) => {
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
  return (
    <div className="dg-posts-container">
      {posts.map((item, index) => {
        return (
          <DG_EachPost
            post={item}
            likeHandler={likeHandler}
            reportHandler={reportHandler}
          />
        );
      })}
    </div>
  );
};

export default DG_Post;
