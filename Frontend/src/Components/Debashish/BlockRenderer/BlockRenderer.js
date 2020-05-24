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
          <ol>
            {block.data.items.map((item, index) => {
              return (
                <li key="index">
                  {" "}
                  {index + 1} &nbsp;{item}
                </li>
              );
            })}
          </ol>
        );
      } else {
        return (
          <ul>
            {block.data.items.map((item, index) => {
              return <li key={index}>&bull; &nbsp;{item}</li>;
            })}
          </ul>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className="ebr-container">
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
