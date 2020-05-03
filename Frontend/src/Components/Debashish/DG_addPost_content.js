import React, { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineVerticalAlignTop,
  AiOutlineVerticalAlignMiddle,
  AiOutlineVerticalAlignBottom,
  AiOutlineColumnHeight,
} from "react-icons/ai";

import { FiItalic, FiBold } from "react-icons/fi";

const DG_addPost_content = ({
  content,
  setContent,
  fonts,
  textColor,
  textSize,
}) => {
  //predefined
  const [tagsList, setTagLists] = useState(["p", "a"]);

  //variable
  const [color, setColor] = useState(textColor[0]);
  const [font, setFont] = useState(fonts[0]);
  const [align, setAlign] = useState("center");
  const [size, setSize] = useState(textSize[1]);
  const [textDecora, setTextDecora] = useState("");
  const [italic, setItalic] = useState("");
  const [bold, setBold] = useState("");
  const [newContent, setNewContent] = useState({
    tag: "",
    text: "",
    className: "",
  });
  useEffect(() => {
    setNewContent({
      ...newContent,
      className: `dg-text-${size} dg-t-${align} dg-text-${color} dg-font-${font} dg-t-d-${textDecora} dg-${bold} dg-${italic}`,
    });
  }, [color, font, align, size, textDecora, bold, italic]);

  //toggler
  const [moreTog, setMoreTog] = useState(false);
  return (
    <div className="dg-addpost-content-tools">
      <textarea
        className={newContent.className}
        value={newContent.text}
        onChange={(e) => {
          setNewContent({ ...newContent, text: e.target.value });
        }}
      ></textarea>
      {/* styles */}

      {/* color */}
      <div className={`dg-ap-text-color dg-ap-tool-txt-color`}>
        <span style={{ color: color }}>Color : </span>
        {textColor.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setColor(item)}
              style={{ background: item }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          );
        })}
      </div>

      <div className="dg-ap-tool-bar">
        {/* text align */}
        <button
          onClick={() => {
            setAlign("left");
          }}
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          onClick={() => {
            setAlign("center");
          }}
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          onClick={() => {
            setAlign("right");
          }}
        >
          <AiOutlineAlignRight />
        </button>

        {/* decoration  */}
        <button
          onClick={() => {
            if (italic == "italic") setItalic("");
            else setItalic("italic");
          }}
        >
          <FiItalic />
        </button>
        <button
          onClick={() => {
            if (bold == "bold") setBold("");
            else setBold("bold");
          }}
        >
          <FiBold />
        </button>
        <button
          onClick={() => {
            if (textDecora == "underline") setTextDecora("");
            else setTextDecora("underline");
          }}
        >
          <AiOutlineVerticalAlignBottom />
        </button>
        <button
          onClick={() => {
            if (textDecora == "line-through") setTextDecora("");
            else setTextDecora("line-through");
          }}
        >
          <AiOutlineVerticalAlignMiddle />
        </button>
        <button
          onClick={() => {
            if (textDecora == "overline") setTextDecora("");
            else setTextDecora("overline");
          }}
        >
          <AiOutlineVerticalAlignTop />
        </button>
        <button
          onClick={() => {
            if (textDecora == "both") setTextDecora("");
            else setTextDecora("both");
          }}
        >
          <AiOutlineColumnHeight />
        </button>
      </div>

      {/* tag type */}
      {moreTog ? (
        <div className="animated zoomInDown dg-addpost-content-tools-styles">
          <div>
            <span>Type :</span>
            {tagsList.map((item, index) => {
              const names = ["Paragraph", "Link"];
              return (
                <button
                  key={index}
                  onClick={() => setNewContent({ ...newContent, tag: item })}
                >
                  {" "}
                  {names[index]}{" "}
                </button>
              );
            })}
          </div>

          {/* fonts */}
          <div>
            {fonts.map((item, index) => {
              return (
                <button
                  className={`dg-font-${item}`}
                  key={index}
                  onClick={() => {
                    setFont(item);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* text size */}
          <div>
            {textSize.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`dg-text-${item}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <span
          onClick={() => setMoreTog(!moreTog)}
          style={{ color: "blue", "text-decoration": "underline" }}
        >
          {moreTog ? <>less...</> : <>more...</>}
        </span>

        <button
          onClick={() => {
            setContent(content.concat(newContent));
          }}
        >
          <MdDone />
        </button>
      </div>
    </div>
  );
};

export default React.memo(DG_addPost_content);
