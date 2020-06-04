import React, { useEffect, useState } from "react";
import { MdModeComment } from "react-icons/md";
import axios from "axios";

function DG_complete_comment({ userName, path, userId, post, setPost }) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    setIsUploading(true);
    axios
      .patch(`${path}/feed/update`, {
        _id: post._id,
        _user_id: userId,
        response: {
          name: username,
          comment: comment,
        },
      })
      .then((res) => {
        let newPost = { ...post };
        newPost.response.push({
          _id: Math.random() * Math.pow(10, 24),
          name: username,
          comment: comment,
        });
        setComment("");
        setPost(newPost);
        setIsUploading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsUploading(false);
      });
  };

  useEffect(() => {
    if (isAnonymous) setUsername("Anonymous");
    else setUsername(userName);
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
          disabled={isUploading}
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
          {username}
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

export default React.memo(DG_complete_comment);
