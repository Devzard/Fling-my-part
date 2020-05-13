import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FaBackspace } from "react-icons/fa";
import DG_Post from "./DG_Post";
import "./styles/dg_profile.css";
import axios from "axios";

function DG_profile() {
  const path = "https://my-fling.herokuapp.com";
  let { username } = useParams();
  let history = useHistory();

  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);

  const bringPost = () => {
    axios
      .post(`${path}/feed/user/posts/${username}`, { _user_id: userId })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const user = Cookies.get("_user_id");
    setUserId(user);

    bringPost();
  }, []);

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
