import React, { useState, useEffect } from "react";
import "./styles/dg-eachfeed.css";
import { AiTwotoneFire } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdMoreHoriz, MdPerson } from "react-icons/md";

const EachFeed = (props) => {
  const [post, setPost] = useState(props.post);
  return (
    <div className="dg-card">
      <span>
        <MdPerson />
      </span>
      <span>{post.username}</span>
      <span className={`${post.category}`}>{post.category}</span>
      <br />
      <span>
        <i>{post.name}</i>
      </span>

      <div className={`dg-feed-content `}>
        <div className={`dg-depth dg-${post.category}`}></div>
        <p>{post.content}</p>
      </div>
      <span className="dg-uploadtime">uploaded on {post.uploadTime}</span>
      <div className="dg-eachfeed-btn">
        <div>
          <button disabled>
            <AiTwotoneFire />
          </button>
          {post.likedUsers.length}
        </div>
        <div>
          <button>
            <FaComment />
          </button>
          {post.comments.length}
        </div>
        <div>
          <button>
            <MdMoreHoriz />
          </button>
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
};

export default EachFeed;
