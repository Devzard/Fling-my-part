import React, { useForceUpdate, useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "./styles/dg_background_template.css";
import "./styles/pattern.min.css";
import "./styles/dg_templates.css";
import "./styles/dg_common.css";
import "./styles/dg_post.css";
import "./styles/dg_completepost.css";
import { FaBackspace } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../Loader";
import BlockRenderer from "./BlockRenderer/BlockRenderer";

import DG_complete_comment from "./DG_complete_comment";

function DG_completePost() {
  const path = "https://my-fling.herokuapp.com";
  let { id } = useParams();
  let history = useHistory();
  let key = Math.random();

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

  const isOwner = (userName, paramName) => {
    if (userName == paramName) return true;
    return false;
  };

  const commentDeleteHandler = (resId) => {
    axios
      .patch(`${path}/feed/delete/response`, {
        postId: post._id,
        responseId: resId,
        _user_id: userId,
        recogniser: post.recogniser,
      })
      .then((res) => {
        let newPost = { ...post };
        newPost.response.map((item, index) => {
          if (item._id == resId) newPost.response.splice(index, 1);
        });
        setPost(newPost);
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
        <span>
          <Link
            style={{ fontStyle: "italic", color: "white" }}
            to="/flingazine"
          >
            flingazine
          </Link>
        </span>
        <span></span>
      </div>

      {isPostLoaded ? (
        <div className="dg-cmp-container">
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
                userName={userName}
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
              {post.response
                .slice()
                .reverse()
                .map((item) => {
                  return (
                    <li key={item._id} className="dg-cmp-eachcomment">
                      <Link
                        to={`/flingazine/${item.name}`}
                        className="dg-cmp-comment-thumbnail"
                      >
                        {item.name}
                      </Link>
                      <br />
                      {item.comment}
                      {isOwner(userName, post.username) ? (
                        <span
                          className="dg-cp-cmt-delete"
                          onClick={() => commentDeleteHandler(item._id)}
                        >
                          <MdDelete />
                        </span>
                      ) : (
                        <></>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>{" "}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default React.memo(DG_completePost);
