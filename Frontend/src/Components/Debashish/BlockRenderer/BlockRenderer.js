import React from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../EditorjsPlugins/tools";
import "./BlockRenderer.css";
import Output from "editorjs-react-renderer";

function BlockRenderer({ data }) {
  const renderBlock = (block, index) => {
    if (block.type == "paragraph") {
      return <div key={index}>{block.data.text}</div>;
    } else if (block.type == "header") {
      let Tag = `h${block.data.level}`;
      return <Tag key={index}>{block.data.text}</Tag>;
    } else if (block.type == "embed") {
      return (
        <>
          <iframe
            style={{ width: "100%" }}
            height={block.data.height}
            frameborder="0"
            allowfullscreen=""
            src={block.data.embed}
          ></iframe>
          {console.log(block.data.embed)}
          <div>{block.data.caption}</div>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="block-renderer-container">
      *****
      {data != null ? (
        <>{data.blocks.map((item, index) => renderBlock(item, index))}</>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BlockRenderer;
