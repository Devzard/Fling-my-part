import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";

function DG_addpost_para({
  textSize,
  textColor,
  fonts,
  blocks,
  setBlocks,
  toggleAddMoreTog,
}) {
  //states
  const [text, setText] = useState("");
  const [newFont, setNewFont] = useState(fonts[0]);
  const [newTextSize, setNewTextSize] = useState(textSize[1]);
  const [newTextColor, setNewTextColor] = useState(textColor[0]);
  const [textAlign, setTextAlign] = useState("center");

  //new block
  const [newBlock, setNewBlock] = useState({
    _id: Math.floor(Math.random()),
    tag: "Paragraph",
    text: "",
    className: "",
    responseList: [],
  });

  // functions
  const paraSubmitHandler = () => {
    setBlocks(blocks.concat(newBlock));
  };

  useEffect(() => {
    setNewBlock({
      ...newBlock,
      className: `dg-text-${newTextSize} dg-text-${newTextColor} dg-font-${newFont} dg-t-${textAlign}`,
    });
  }, []);

  useEffect(() => {
    setNewBlock({
      ...newBlock,
      className: `dg-text-${newTextSize} dg-text-${newTextColor} dg-font-${newFont} dg-t-${textAlign}`,
    });
  }, [newFont, newTextColor, newTextSize, textAlign]);

  return (
    <div className="dg-ap-para-container">
      <span>
        <textarea
          value={newBlock.text}
          onChange={(e) => setNewBlock({ ...newBlock, text: e.target.value })}
          className={`dg-ap-para-textarea ${newBlock.className}`}
        ></textarea>
        <button
          onClick={() => {
            toggleAddMoreTog(false);
            paraSubmitHandler();
          }}
          className="dg-flat-btn-p"
        >
          Add
        </button>
      </span>

      {/* tools */}
      <div className="dg-ap-para-tools">
        <div className="dg-color-btns">
          <span style={{ color: `${newTextColor}` }}>Colour : </span>
          {textColor.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setNewTextColor(item)}
                className={` dg-text-${item}`}
                style={{ background: `${item}` }}
              ></button>
            );
          })}
        </div>

        <hr className="dg-hr-light" />
        <div>
          {fonts.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setNewFont(item)}
                className={`dg-font-${item} dg-tool-btn`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <hr className="dg-hr-light" />
        <div>
          {textSize.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setNewTextSize(item)}
                className={`dg-text-${item} dg-tool-btn`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <hr className="dg-hr-light" />

        {/* aligns  */}
        <button
          className="dg-tool-btn"
          onClick={() => {
            setTextAlign("left");
          }}
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          className="dg-tool-btn"
          onClick={() => {
            setTextAlign("center");
          }}
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          className="dg-tool-btn"
          onClick={() => {
            setTextAlign("right");
          }}
        >
          <AiOutlineAlignRight />
        </button>
      </div>
    </div>
  );
}

export default DG_addpost_para;
