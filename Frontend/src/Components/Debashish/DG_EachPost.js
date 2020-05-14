import React, { useState, useEffect } from "react";
import { FaUser, FaComment } from "react-icons/fa";
import { AiTwotoneFire, AiOutlineLink } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";

function DG_EachPost({ post, likeHandler, reportHandler, isLoggedIn }) {
  const renderContent = (contents) => {
    if (contents.tag == "a")
      return (
        <div className={`main-content-txt ${contents.template}`}>
          <a
            className={`inside-content-txt ${contents.className}`}
            href="#"
            onClick={() => {
              window.open(contents.text, "_blank");
            }}
          >
            <AiOutlineLink />
            &nbsp;
            {contents.text}
          </a>
        </div>
      );
    const Tag = contents.tag.length > 0 ? contents.tag : "p";
    return (
      <div className={`main-content-txt ${contents.template}`}>
        <Tag className={`inside-content-txt ${contents.className}`}>
          {contents.text}
        </Tag>
      </div>
    );
  };

  return (
    <div className="dg-eachpost">
      {/* content  */}
      <div className="dg-ep-container">
        <span className={`dg-ep-depth dg-${post.category}-bg`}></span>
        <div className="dg-ep-content-mid">
          <div className="dg-ep-title">{renderContent(post.title)}</div>
          <div className="dg-ep-content">
            {post.content.map((item) => {
              return renderContent(item);
            })}
          </div>
        </div>
      </div>
      <br />

      {/* header  */}
      <div className="dg-ep-header">
        <span className={`dg-${post.category} dg-ep-h-category`}>
          {post.category}
        </span>
        &nbsp;
        <span className={`dg-ep-h-username`}>
          <i>from</i>&nbsp;&nbsp;
          <FaUser /> {post.username}
        </span>
      </div>
      <div className="dg-ep-h-location">{post.location}</div>
      <br />

      {/* buttons  */}
      <div className="dg-ep-btns">
        <span>
          <button
            className="dg-ep-btns-like dg-r-sm-btn"
            disabled={!isLoggedIn}
          >
            <AiTwotoneFire />
          </button>
          &nbsp;&nbsp;
          {post.likedUsers.length}
        </span>
        <span>
          <Link to={`/feed/post/${post._id}`}>
            <button
              className="dg-ep-btns-comment dg-r-sm-btn"
              disabled={!isLoggedIn}
            >
              <FaComment />
            </button>
          </Link>
          &nbsp;&nbsp;
        </span>
        <button className="dg-ep-btns-more dg-r-sm-btn" disabled={!isLoggedIn}>
          <MdMoreHoriz />
        </button>
      </div>
      {isLoggedIn ? (
        <></>
      ) : (
        <h4>
          <Link to="/login">
            <u style={{ color: "blue" }}>Sign in or Login</u>
          </Link>{" "}
          to like and comment
        </h4>
      )}
      <br />
      <hr />
    </div>
  );
}

export default React.memo(DG_EachPost);
