import React, { useState, useEffect } from "react";
import { AiFillMacCommand } from "react-icons/ai";

function DG_addpost_response({
  backgroundColor,
  fonts,
  blocks,
  setBlocks,
  toggleAddMore,
}) {
  //states
  const [responseList, setResponseList] = useState("");
  const [responseValue, setResponseValue] = useState("");
  const [newBlock, setNewBlock] = useState({
    tag: "Response",
    text: "",
    className: "",
    responseList: [],
  });

  //functions
  const renderInputs = () => {};

  const inputValidator = () => {};

  useEffect(() => {
    console.log(responseList);
    setResponseValue("");
  }, [responseList]);

  return (
    <div className="dg-ap-response-container">
      {/* take response value  */}
      <div className="dg-ap-response-display">{renderInputs()}</div>

      {/* input area  */}
      <div className="dg-ap-response-inputs">
        <input
          onChange={(e) => setResponseValue(e.target.value)}
          value={responseValue}
          placeholder="Response Name"
        ></input>
        <button
          onClick={() => {
            setResponseList(`${responseList} ${responseValue}`);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default React.memo(DG_addpost_response);
