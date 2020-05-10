import React, { useState, useEffect } from "react";
import DG_addPost_template from "./DG_addPost_template";
import { FcCheckmark } from "react-icons/fc";
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
  bgTemplates,
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
  const [stroke, setStroke] = useState("");
  const [template, setTemplate] = useState(bgTemplates[0]);
  const [newContent, setNewContent] = useState({
    tag: "p",
    text: "",
    className: "",
    template: "",
  });
  useEffect(() => {
    setNewContent({
      ...newContent,
      className: `dg-t-d-${stroke} dg-text-${size} dg-t-${align} dg-text-${color} dg-font-${font} dg-t-d-${textDecora} dg-${bold} dg-${italic}`,
    });
  }, [color, font, align, size, textDecora, bold, italic, stroke]);

  useEffect(() => {
    setNewContent({
      ...newContent,
      template: `${template}`,
    });
  }, [template]);

  useEffect(() => {
    setNewContent({
      ...newContent,
      className: `dg-t-d-${stroke} dg-text-${size} dg-t-${align} dg-text-${color} dg-font-${font} dg-t-d-${textDecora} dg-${bold} dg-${italic}`,
    });
  }, []);

  //toggler
  const [moreTog, setMoreTog] = useState(false);
  const [templateToggler, toggleTemplateTog] = useState(false);
  ///
  return (
    <div className="dg-addpost-content-tools">
      <br />
      <hr />
      <br />
      <div className={newContent.template}>
        <textarea
          placeholder="Type here...(maximum 500 characters at a time) "
          className={`inside-content-txt ${newContent.className}`}
          value={newContent.text}
          onChange={(e) => {
            setNewContent({ ...newContent, text: e.target.value });
          }}
          maxLength="500"
        ></textarea>
      </div>

      {/* styles */}
      <div className="dg-ap-tool-box">
        {/* color */}
        <div className={`dg-ap-tool-txt-color`}>
          <span className="dg-label">Color </span>:
          {textColor.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setColor(item)}
                style={{ background: item }}
              ></button>
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

        {/* more */}
        <br />
        <div>
          <span
            onClick={() => setMoreTog(!moreTog)}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            {moreTog ? <>less...</> : <>more...</>}
          </span>
          &nbsp;&nbsp;
          <button
            className="dg-r-sm-btn"
            onClick={() => {
              setContent(content.concat(newContent));
            }}
          >
            <FcCheckmark />
          </button>
        </div>
        <br />

        {moreTog ? (
          <div className="animated zoomInDown dg-addpost-content-tools-styles">
            <div className="dg-template-container">
              {templateToggler ? (
                <DG_addPost_template
                  bgTemplates={bgTemplates}
                  toggleTemplateTog={toggleTemplateTog}
                  setTemplate={setTemplate}
                />
              ) : (
                <div
                  onClick={() => toggleTemplateTog(true)}
                  className={`dg-template-preview ${template}`}
                >
                  {"   "}
                </div>
              )}
            </div>

            {/* tag type */}
            <div>
              <span className="dg-label">
                {newContent.tag == "p" ? "Paragraph" : "Link"}
              </span>{" "}
              :
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

            {/* strokes */}
            <div className="dg-strokes-bar">
              <span className="dg-label">Strokes</span> :
              <button
                onClick={() => {
                  setStroke("");
                }}
                className={`dg-text-${font}`}
              >
                A
              </button>
              <button
                onClick={() => {
                  setStroke("stroke1-b");
                }}
                className={`dg-font-${font} dg-t-d-stroke1-b`}
              >
                A
              </button>
              <button
                onClick={() => {
                  setStroke("stroke1-w");
                }}
                className={`dg-font-${font} dg-t-d-stroke1-w`}
              >
                A
              </button>
              <button
                onClick={() => {
                  setStroke("stroke2-b");
                }}
                className={`dg-font-${font} dg-t-d-stroke2-b`}
              >
                A
              </button>
              <button
                onClick={() => {
                  setStroke("stroke2-w");
                }}
                className={`dg-font-${font} dg-t-d-stroke2-w`}
              >
                A
              </button>
              <button
                onClick={() => {
                  setStroke("stroke1-animate");
                }}
                className={`dg-font-${font} dg-t-d-stroke1-animate`}
              >
                A
              </button>
            </div>

            {/* fonts */}
            <div>
              <span className="dg-label">Font</span> :
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
              <span className="dg-label">Size</span> :
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
      </div>
    </div>
  );
};

export default React.memo(DG_addPost_content);
