import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function DG_addpost_para({ textSize, textColor, fonts, blocks, setBlocks }) {
  //states
  const [text, setText] = useState("");
  return (
    <div className="dg-ap-para-container">
      <textarea></textarea>
    </div>
  );
}

export default DG_addpost_para;
