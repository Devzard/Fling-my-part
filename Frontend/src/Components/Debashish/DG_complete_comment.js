import React, { useEffect, useState } from "react";
import { MdModeComment } from "react-icons/md";
import axios from "axios";

function DG_complete_comment({ path, userId, post, setPost }) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    axios.patch(`${path}/feed/update`, {
      _id: post._id,
      _user_id: userId,
      recogniser: post.recogniser,
      response: {
        name: username,
        comment: comment,
      },
    });
  };

  useEffect(() => {
    if (isAnonymous) setUsername("Anonymous");
    else setUsername(post.username);
  }, [isAnonymous]);

  useEffect(() => {
    setUsername(post.username);
  }, []);

  return (
    <>
      <form className="dg-cmp-comment-form">
        <label></label>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="comment here"
        ></textarea>
        <button
          onClick={(e) => {
            commentSubmitHandler(e);
          }}
          className="dg-btn"
        >
          <MdModeComment />
          Comment
        </button>
      </form>
      <div className="dg-cmp-comment-selector">
        <span>Comment as - </span>
        <span
          onClick={() => {
            setIsAnonymous(false);
          }}
          className={`dg-toggler-${!isAnonymous}`}
        >
          {post.username}
        </span>
        &nbsp; : &nbsp;
        <span
          onClick={() => {
            setIsAnonymous(true);
          }}
          className={`dg-toggler-${isAnonymous}`}
        >
          Anonymous
        </span>
      </div>
    </>
  );
}

export default DG_complete_comment;
