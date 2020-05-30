import React from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../EditorjsPlugins/tools";
import "./BlockRenderer.css";
import Output from "editorjs-react-renderer";

function BlockRenderer({ data }) {
  const renderBlock = (block, index) => {
    if (block.type == "paragraph") {
      return (
        <div className="ebr-para" key={index}>
          {block.data.text}
        </div>
      );
    } else if (block.type == "header") {
      let Tag = `h${block.data.level}`;
      return (
        <Tag className="ebr-header" key={index}>
          {block.data.text}
        </Tag>
      );
    } else if (block.type == "embed") {
      return (
        <div className="ebr-embed">
          <iframe
            frameborder="0"
            allowfullscreen=""
            allowTransparency="true"
            scrolling="no"
            src={block.data.embed}
          ></iframe>
          {console.log(block.data.embed)}
          <div>{block.data.caption}</div>
        </div>
      );
    } else if (block.type == "simpleImage") {
      return (
        <div>
          <div>
            <img src={block.data.url} />
          </div>
          <div>{block.data.caption}</div>
        </div>
      );
    } else if (block.type == "list") {
      if (block.data.style == "ordered") {
        return (
          <ul>
            {block.data.items.map((item, index) => {
              return (
                <li key="index">
                  <span>{index + 1}.</span>
                  <span> {item}</span>
                  <span></span>
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <ul>
            {block.data.items.map((item, index) => {
              return (
                <li key={index}>
                  <span>&bull;</span>
                  <span>{item}</span>
                  <span></span>
                </li>
              );
            })}
          </ul>
        );
      }
    } else if (block.type == "delimiter") {
      return (
        <div className="ebr-delimiter">
          <span>* * *</span>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="ebr-container">
      {data != null ? (
        <div className="ebr-content">
          {data.blocks.map((item, index) => renderBlock(item, index))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BlockRenderer;
