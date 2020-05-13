import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FaBackspace } from "react-icons/fa";
import DG_Post from "./DG_Post";
import "./styles/dg_profile.css";

function DG_profile() {
  let { username, recogniser } = useParams();
  let history = useHistory();

  const [posts, setPosts] = useState([
    {
      _id: 1,
      title: {
        tag: "",
        text: "New topic",
        className: "",
      },
      category: "General",
      content: [
        {
          tag: "",
          text: "NIcely working",
          className: "",
          template: "",
        },
        {
          tag: "",
          text: "you you",
          className: "",
          template: "",
        },
      ],
      location: "Dibrugarh University",
      recogniser: "#",
      likedUsers: [],
      reportedUsers: [],
      username: "Mithical",
      uploadTime: "00;00;00",
      comments: [
        {
          name: "Mathew",
          comment: "Nice",
        },
        {
          name: "anonymous",
          comment: "It's a nice one",
        },
      ],
    },
    {
      _id: 2,
      title: {
        tag: "",
        text: "New topic",
        className: "",
      },
      category: "Rumour",
      content: [
        {
          tag: "",
          text: "NIcely working",
          className: "",
          template: "",
        },
      ],
      location: "Dibrugarh University",
      recogniser: "#",
      likedUsers: [],
      reportedUsers: [],
      username: "Mithical",
      uploadTime: "00;00;00",
      comments: [
        {
          name: "Mathew",
          comment: "Nice",
        },
        {
          name: "anonymous",
          comment: "It's a nice one",
        },
      ],
    },
  ]);

  return (
    <div>
      {/* header  */}
      <div className="dg-p-header">
        <span onClick={() => history.goBack()}>
          <FaBackspace />
        </span>
        <span>fling</span>
        <span></span>
      </div>

      {/* mid */}
      <div className="dg-p-info">
        {/* image */}
        <span className="dg-p-username">{username}</span>
        <span className="dg-p-location">Jorhat Engineering</span>
      </div>

      {/* posts  */}
      <div className="dg-p-posts">
        <DG_Post posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
}

export default DG_profile;
