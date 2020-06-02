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
import BlockRenderer from "./BlockRenderer/BlockRenderer";

import DG_complete_comment from "./DG_complete_comment";

function DG_everyPost() {
  const path = "https://my-fling.herokuapp.com";
  let { id } = useParams();
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const [isUserIdPresent, setUserIdPresent] = useState(false);
  const [isPostLoaded, setIsPostsLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const [post, setPost] = useState({});

  const bringPost = () => {
    axios
      .post(`${path}/feed/posts/${id}`, { _user_id: userId })
      .then((res) => {
        setPost(res.data[0]);
        setIsPostsLoaded(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    window.scroll(0, 0);
    const user = Cookies.get("_user_id");
    const userN = Cookies.get("username");
    setUserId(user);
    setUserName(userN);

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
        <span></span>
      </div>

      {isPostLoaded ? (
        <>
          <BlockRenderer
            userName={userName}
            paramName={post.username}
            data={post}
          />
          {/* comments  */}
          <div className={`dg-cmp-comments`}>
            {isUserIdPresent ? (
              <DG_complete_comment
                userId={userId}
                post={post}
                setPost={setPost}
                path={path}
              />
            ) : (
              <h4 style={{ color: "blue" }}>
                Sign in to comment, like or report{" "}
                <Link to="/signup">
                  <u>Sign in or Log in</u>
                </Link>
              </h4>
            )}
            <ul>
              {post.response.map((item) => {
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
