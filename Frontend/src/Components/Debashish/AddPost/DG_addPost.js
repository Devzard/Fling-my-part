import React, { useState, useEffect } from "react";
import "./dg_ap.css";
import DG_addpost_para from "./DG_addpost_para";
import DG_addpost_link from "./DG_addpost_link";
import DG_addpost_response from "./DG_addpost_response";

import DG_renderBlock from "../BlockRenderer/DG_renderBlock";

function AddPost({ toggleAddPost, posts, setPosts, userDetails }) {
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
  const textColor = [
    "black",
    "white",
    "yellow",
    "cyan",
    "blue",
    "green",
    "red",
  ];
  const backgroundColor = ["blue", "green", "red", "maroon", "yellow"];
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

  //states
  const [blocks, setBlocks] = useState([
    {
      _id: 1,
      tag: "Response",
      text: "hey new",
      responseList: [],
      className: "3 5",
    },
  ]);
  const [addState, setAddState] = useState("Response");
  const [addMoreTog, toggleAddMoreTog] = useState(true);
  const [template, setTemplate] = useState("template-default");

  const toolBoxRenderer = () => {
    if (addState == "Paragraph")
      return (
        <DG_addpost_para
          textSize={textSize}
          textColor={textColor}
          fonts={fonts}
          blocks={blocks}
          setBlocks={setBlocks}
          toggleAddMoreTog={toggleAddMoreTog}
        />
      );
    else if (addState == "Response")
      return (
        <DG_addpost_response
          backgroundColor={backgroundColor}
          fonts={fonts}
          blocks={blocks}
          setBlocks={setBlocks}
          toggleAddMoreTog={toggleAddMoreTog}
        />
      );
    else if (addState == "Link")
      return (
        <DG_addpost_link
          fonts={fonts}
          textColor={textColor}
          textSize={textSize}
          blocks={blocks}
          setBlocks={setBlocks}
          toggleAddMoreTog={toggleAddMoreTog}
        />
      );
    else setAddState("Paragraph");
  };

  return (
    <div className="dg-ap-head-container">
      <div className="dg-ap-head">
        <span> X </span>
        <span>fling</span>
        <span></span>
      </div>

      {/* content rendering preview */}
      <div className="dg-ap-preview">
        <DG_renderBlock blocks={blocks} />
      </div>
      <hr className="dg-separater" />

      {/* addmore button  */}
      <div className="dg-ap-addmore-btn">
        <button
          className="dg-flat-btn-p"
          onClick={() => toggleAddMoreTog(!addMoreTog)}
        >
          {addMoreTog ? "Cancel" : "Add"}
        </button>
      </div>

      {/* add block section */}
      {addMoreTog && (
        <>
          <div className="dg-ap-addblock-opt">
            <span>{addState} : </span>
            <button
              onClick={() => setAddState("Paragraph")}
              className="dg-flat-btn-p"
            >
              Para +
            </button>
            <button
              onClick={() => setAddState("Response")}
              className="dg-flat-btn-p"
            >
              Response +
            </button>
            <button
              onClick={() => setAddState("Link")}
              className="dg-flat-btn-p"
            >
              Link +
            </button>
          </div>
          {/* tool box section  */}
          <div className="dg-ap-toolbox">{toolBoxRenderer()}</div>
        </>
      )}
    </div>
  );
}

export default React.memo(AddPost);
