import React, { useState, useEffect } from "react";
import DG_addPost from "./DG_addPost";
import "./styles/dg_common.css";
import "./styles/dg_templates.css";

function DG_feed() {
  const [addPostToggler, toggleAddPost] = useState(true);
  return (
    <div>
      {/* logo, location, apppost, feedback or report */}
      <div>
        {addPostToggler && <DG_addPost toggleAddPost={toggleAddPost} />}
        <button
          onClick={() => {
            toggleAddPost(true);
          }}
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

export default DG_feed;
