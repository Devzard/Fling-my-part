import React, { useState, useEffect } from "react";
import "./styles/dg_addPost.css";
import DG_addPost_title from "./DG_addPost_title";
import DG_addPost_content from "./DG_addPost_content";
import { FaBackspace } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";

import Loader from "../Loader";
import axios from "axios";

const DG_addPost = ({ toggleAddPost, posts, setPosts, userDetails }) => {
  const path = "https://my-fling.herokuapp.com";
  const [isUploading, setIsUploading] = useState(false);
  //predefined values
  const fonts = [
    "baloo",
    "modak",
    "poppins",
    "galada",
    "montserrat",
    "caveat",
    "cinzel",
  ];

  const textColor = ["black", "white", "red", "yellow", "blue", "green"];
  const [bgTemplates, setBgTemplates] = useState([
    //SIZE-sm,md,lg,xl
    "template-default",
    "pattern-checks-md",
    "pattern-grid-md",
    "pattern-dots-md",
    "pattern-cross-dots-md",
    "pattern-diagonal-lines-md",
    "pattern-horizontal-lines-md",
    "pattern-vertical-lines-md",
    "pattern-diagonal-stripes-md",
    "pattern-horizontal-stripes-md",
    "pattern-vertical-stripes-md",
    "pattern-triangles-md",
    "pattern-zigzag-md",
    "leaverou-microbial-mat",
    "leaverou-stairs",
    "leaverou-rombes",
    "leaverou-arrows",
    "leaverou-zig-zag",
    "leaverou-weave",
    "leaverou-rainbow-bokeh",
    "leaverou-upholster",
    "leaverou-starry-night",
    "leaverou-marrakesh",
    "leaverou-carbon",
    "leaverou-hearts",
    "leaverou-argyle",
    "leaverou-cross",
    "leaverou-yin-yang",
    "leaverou-stars",
    "leaverou-brady-bunch",
    "leaverou-shippo",
    "leaverou-bricks",
    "leaverou-seigaiha",
    "leaverou-japanese-cube",
    "leaverou-houndstooth",
    "leaverou-tartan",
    "leaverou-madras",
    "leaverou-lined-paper",
    "leaverou-blueprint-grid",
    "leaverou-tablecloth",
    "leaverou-cicada-stripes",
    "leaverou-honey-comb",
    "leaverou-wave",
    "leaverou-pyramid",
    "leaverou-chocolate-waves",
    "leaverou-cross-dots",
  ]);
  const textSize = ["very-small", "small", "normal", "large"];
  const categoryList = [
    "General",
    "Event",
    "Rumour",
    "Poem",
    "Story",
    "News",
    "Confession",
  ];
  //variables
  const [title, setTitle] = useState({
    tag: "p",
    text: "",
    className: "",
  });
  const [content, setContent] = useState([
    {
      tag: "p",
      text: "",
      className: "",
      template: "",
    },
  ]);
  const [category, setCategory] = useState("General");
  //togglers
  const [titleTog, toggleTitleTog] = useState(false);

  //content renderer
  const renderContent = (contents) => {
    if (contents.tag == "a")
      return (
        <div className={`main-content-txt ${contents.template}`}>
          <a
            className={`inside-content-txt ${contents.className}`}
            href="#"
            onClick={() => {
              window.open(contents.text, "_blank");
            }}
          >
            <AiOutlineLink />
            &nbsp;
            {contents.text}
          </a>
        </div>
      );
    const Tag = contents.tag.length > 0 ? contents.tag : "p";
    return (
      <div className={`main-content-txt ${contents.template}`}>
        <Tag className={`inside-content-txt ${contents.className}`}>
          {contents.text}
        </Tag>
      </div>
    );
  };

  //addpost event handler
  const addPostHandler = () => {
    // setIsUploading(true);
    // axios
    //   .post(`${path}/feed/new`, {
    //     title: title,
    //     category: category,
    //     content: content,
    //     location: userDetails.location,
    //     userId: userDetails.userId,
    //     name: userDetails.name,
    //     username: userDetails.username,
    //   })
    //   .then((res) => {
    //     setPosts(posts.concat(res.data));
    //     setIsUploading(false);
    //     toggleAddPost(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <div className="dg-addpost-container animated fadeInDown">
      <div className="dg-logo-static">fling</div>
      <div className="dg-addpost-header">
        <span
          onClick={() => {
            toggleAddPost(false);
          }}
        >
          <FaBackspace />
        </span>
        <span className="dg-label">Category</span> &nbsp; : &nbsp;
        <select
          className="dg-label"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categoryList.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
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
            fonts={fonts}
            textColor={textColor}
            textSize={textSize}
          />
        )}
      </div>
      {/* content */}
      <div className="main-content">
        {content.map((item) => {
          return renderContent(item);
        })}
        <DG_addPost_content
          content={content}
          setContent={setContent}
          fonts={fonts}
          textColor={textColor}
          textSize={textSize}
          bgTemplates={bgTemplates}
        />
      </div>
      <br />
      <button
        disabled={isUploading}
        onClick={addPostHandler}
        className="dg-ap-send dg-r-sm-btn"
      >
        <IoIosSend />
      </button>
      <br />
      <br />
    </div>
  );
};

export default React.memo(DG_addPost);
