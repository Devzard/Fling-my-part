import React, { useState, useEffect } from "react";
import "./styles/dg-singlefeed.css";
import { AiTwotoneFire } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdMoreHoriz, MdPerson, MdArrowBack } from "react-icons/md";

const SingleFeed = (props) => {
  const [post, setPost] = useState(props.post);
  const [comments, setComments] = useState(props.comments);

  const commentHandler = (postId, userId, comments) => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="dg-single-post animated fadeIn">
      <div className="dg-head-single">
        <span
          onClick={() => {
            props.setMainTog(false);
          }}
          className={`dg-back ${post.category}`}
        >
          <MdArrowBack />
        </span>
        <span className="dg-thumbnail">
          <MdPerson />
        </span>
      </div>
      <div className="dg-single-feed-c">
        <span className={`dg-single-cate ${post.category}`}>
          <i>{post.category}</i>
        </span>
        <div className={`dg-depth dg-${post.category}`}></div>
        <p>{post.content}</p>
      </div>
      <div className="dg-eachfeed-btn">
        <div>
          <button disabled>
            <AiTwotoneFire />
          </button>
          {post.likedUsers.length}
        </div>
        <div>
          <button
            onClick={() => {
              props.setMainTog(false);
            }}
          >
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
      <div className="dg-comments">
        <form>
          <textarea></textarea>
          <button>Submit</button>
        </form>
        <hr />
        <ul>
          {post.comments.map((item, index) => {
            return (
              <li className={` dg-comment-${post.category}`}>
                <div className={`dg-thumbnail-comments`}>
                  <MdPerson />
                  <i className="dg-i">annonymous</i>
                </div>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SingleFeed;
