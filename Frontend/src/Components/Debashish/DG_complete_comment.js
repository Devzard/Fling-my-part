import React, { useEffect, useState } from "react";
import { MdModeComment } from "react-icons/md";

function DG_complete_comment({ userId, post, setPost }) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    setComment("");
  };

  useEffect(() => {
    if (isAnonymous) setUsername("Anonymous");
    else setUsername(post.username);
  }, [isAnonymous]);

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
