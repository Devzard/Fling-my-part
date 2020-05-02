import React, { useState, useEffect } from "react";
import "./styles/dg_addPost.css";
import DG_addPost_title from "./DG_addPost_title";

const DG_addPost = (props) => {
  //variables
  const [title, setTitle] = useState({
    tag: "",
    text: "",
    className: "",
  });
  const [content, setContent] = useState();
  //togglers
  const [titleTog, toggleTitleTog] = useState(false);

  //content renderer
  const renderContent = (contents) => {
    console.log(contents);
    if (contents.tag == "h1")
      return <h1 className={contents.className}>{contents.text}</h1>;
    else if (contents.tag == "h3")
      return <h3 className={contents.className}>{contents.text}</h3>;
    else if (contents.tag == "p")
      return <p className={contents.className}>{contents.text}</p>;
    else return <p className={contents.className}>{contents.text}</p>;
  };

  return (
    <div className="dg-addpost-container">
      <h3>Create New Content</h3>
      <br />

      {/* title */}
      <div>
        {titleTog ? (
          <div
            className="dg-addpost-content"
            onClick={() => toggleTitleTog(false)}
          >
            {renderContent(title)}
          </div>
        ) : (
          <DG_addPost_title
            title={title}
            setTitle={setTitle}
            toggleTitleTog={toggleTitleTog}
          />
        )}
      </div>
    </div>
  );
};

export default DG_addPost;
