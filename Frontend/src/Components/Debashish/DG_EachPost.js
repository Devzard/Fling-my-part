import React, { useState, useEffect } from "react";
import { FaUser, FaComment } from "react-icons/fa";
import { AiTwotoneFire } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";

function DG_EachPost({ post, likeHandler, reportHandler }) {
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
      <div className="dg-ep-header">
        <span className="dg-ep-h-username">
          <FaUser /> {post.username}
        </span>
        <span className={`dg-${post.category} dg-ep-h-category`}>
          {post.category}
        </span>
      </div>
      <div className="dg-ep-h-location">{post.location}</div>
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
      <div className="dg-ep-btns">
        <span>
          <button className="dg-ep-btns-like dg-r-sm-btn">
            <AiTwotoneFire />
          </button>
          &nbsp;&nbsp;
          {post.likedUsers.length}
        </span>
        <span>
          <Link to={`/feed/post/${post._id}`}>
            <button className="dg-ep-btns-comment dg-r-sm-btn">
              <FaComment />
            </button>
          </Link>
          &nbsp;&nbsp;
          {post.comments.length}
        </span>
        <button className="dg-ep-btns-more dg-r-sm-btn">
          <MdMoreHoriz />
        </button>
      </div>
      <br />
      <hr />
    </div>
  );
}

export default React.memo(DG_EachPost);
