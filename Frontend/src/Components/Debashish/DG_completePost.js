import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "./styles/dg_background_template.css";
import "./styles/pattern.min.css";
import "./styles/dg_templates.css";
import "./styles/dg_common.css";
import "./styles/dg_post.css";
import "./styles/dg_completepost.css";
import { FaBackspace } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { AiTwotoneFire, AiOutlineLink } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../Loader";

import DG_complete_comment from "./DG_complete_comment";

function DG_everyPost() {
  const path = "https://my-fling.herokuapp.com";
  let { id } = useParams();
  let history = useHistory();

  const [isUserIdPresent, setUserIdPresent] = useState(false);
  const [isPostLoaded, setIsPostsLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const [post, setPost] = useState({});

  const renderContent = (contents) => {
    console.log(contents);
    if (contents.tag == null) return;
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

  const bringPost = () => {
    axios
      .post(`${path}/feed/posts/${id}`, { _user_id: userId })
      .then((res) => {
        setPost(res.data[0]);
        setIsPostsLoaded(true);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    window.scroll(0, 0);
    const user = Cookies.get("_user_id");
    setUserId(user);

    if (user == null) setUserIdPresent(false);
    else setUserIdPresent(true);

    bringPost();
  }, []);

  return (
    <div className="dg-cmp animated fadeInDown">
      {/* header  */}
      <div className="dg-cmp-header">
        {/* <Link to="/feed"> */}
        <span onClick={() => history.goBack()}>
          <FaBackspace className="dg-cmp-back" />
        </span>
        {/* </Link> */}
        <span>{post.username}</span>
        <span className={`dg-${post.category}`}>{post.category}</span>
      </div>
      <span className={`dg-ep-depth dg-${post.category}-bg`}></span>

      {isPostLoaded ? (
        <>
          {/* content part */}
          <div className="dg-cmp-content">
            <div className="dg-cmp-content-location">{post.location}</div>
            <div className="dg-cmp-content-title">
              {renderContent(post.title)}
            </div>
            <div className="dg-cmp-content-body">
              {post.content.map((item) => {
                return renderContent(item);
              })}
            </div>
          </div>
          <br />
          {/* buttons  */}
          <div className="dg-ep-btns">
            <span>
              <button
                disabled={!isUserIdPresent}
                className="dg-ep-btns-like dg-r-sm-btn"
              >
                <AiTwotoneFire />
              </button>
              &nbsp;&nbsp;
              {post.likedUsers.length}
            </span>
            <span>
              <Link to={`/feed`}>
                <button
                  disabled={!isUserIdPresent}
                  className="dg-ep-btns-comment dg-r-sm-btn"
                >
                  <FaComment />
                </button>
              </Link>
              &nbsp;&nbsp;
              {post.comments.length}
            </span>
            <button
              disabled={!isUserIdPresent}
              className="dg-ep-btns-more dg-r-sm-btn"
            >
              <MdMoreHoriz />
            </button>
          </div>
          <br />
          <hr />
          <br />
          {/* comments  */}
          <div className={`dg-cmp-comments`}>
            {isUserIdPresent ? (
              <DG_complete_comment post={post} setPost={setPost} />
            ) : (
              <h4 style={{ color: "blue" }}>
                Sign in to comment, like or report{" "}
                <Link to="/signup">
                  <u>Sign in or Log in</u>
                </Link>
              </h4>
            )}
            <ul>
              {post.comments.map((item) => {
                return (
                  <li
                    key={item._id}
                    className={` dg-cmp-comment-${post.category}`}
                  >
                    <div className="dg-cmp-comment-thumbnail">{item.name}</div>
                    <br />
                    {item.comment}
                  </li>
                );
              })}
            </ul>
          </div>{" "}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default React.memo(DG_everyPost);
