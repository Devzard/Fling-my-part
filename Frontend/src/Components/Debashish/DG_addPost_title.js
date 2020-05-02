import React, { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";

const DG_addPost_title = ({ title, setTitle, toggleTitleTog }) => {
  //defined
  const [fonts, setFonts] = useState([
    "baloo",
    "modak",
    "poppins",
    "galada",
    "montserrat",
    "caveat",
    "cinzel",
  ]);

  const [textColor, setTextColor] = useState([
    "black",
    "white",
    "red",
    "yellow",
    "blue",
    "green",
  ]);
  const [textSize, setTextSizes] = useState(["small", "normal", "large"]);
  const [textAlign, setTextAlign] = useState(["left", "center", "right"]);

  //values
  const [font, setFont] = useState(fonts[0]);
  const [color, setColor] = useState(textColor[0]);
  const [align, setAlign] = useState(textAlign[1]);
  const [size, setSize] = useState(textSize[1]);

  //toggler
  const [moreTog, setMoreTog] = useState(false);

  useEffect(() => {
    setTitle({
      ...title,
      className: `dg-font-${font} dg-text-${color} dg-t-${align} dg-text-${size}`,
    });
  }, [font, color, align, size]);
  return (
    <div className="dg-addpost-title">
      <input
        placeholder="Title (maximum 50 characters)"
        type="text"
        onChange={(e) => setTitle({ ...title, text: e.target.value })}
        value={title.text}
        className={title.className}
        maxLength="50"
      ></input>
      {moreTog ? (
        <div className="animated zoomInDown">
          {/* text color */}
          <div className={`dg-font-${font} dg-ap-text-color`}>
            <span style={{ color: color }}>Color : </span>
            {textColor.map((item) => {
              return (
                <button
                  onClick={() => setColor(item)}
                  style={{ background: item }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              );
            })}
            <hr />
          </div>
          {/* fonts */}
          <div
            className={`dg-text-${size} dg-text-${color} dg-t-${align} dg-font-${font}`}
          >
            <span>Font : </span>
            {fonts.map((item) => {
              return (
                <button
                  className={`dg-text-${size} dg-text-${color} dg-font-${item}`}
                  onClick={() => setFont(item)}
                >
                  {item}
                </button>
              );
            })}
            <hr />
          </div>
          {/* header size */}
          <div className={`dg-text-${color} dg-t-${align} dg-font-${font}`}>
            <span className={`dg-text-${size}`}>Size :</span>
            {textSize.map((item) => {
              return (
                <button
                  className={`dg-text-${color} dg-font-${font} dg-text-${item}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              );
            })}
            <hr />
          </div>
          {/* text align */}
          <div
            className={`dg-text-${size} dg-text-${color} dg-t-${align} dg-font-${font}`}
          >
            <span>Align :</span>
            {textAlign.map((item) => {
              return (
                <button
                  className={`dg-text-${size} dg-text-${color} dg-font-${font}`}
                  onClick={() => {
                    setAlign(item);
                  }}
                >
                  {item}
                </button>
              );
            })}
            <hr />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setMoreTog(true)}
          style={{ color: "blue", "text-decoration": "underline" }}
        >
          more...
        </button>
      )}
      <button
        onClick={() => {
          toggleTitleTog(true);
        }}
      >
        <MdDone />
      </button>
    </div>
  );
};

export default React.memo(DG_addPost_title);
