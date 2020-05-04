import React, { useState, useEffect } from "react";
import DG_addPost from "./DG_addPost";
import "./styles/pattern.min.css";
import "./styles/dg_background_template.css";
import "./styles/dg_templates.css";
import "./styles/dg_common.css";

function DG_feed() {
  const [addPostToggler, toggleAddPost] = useState(false);
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
