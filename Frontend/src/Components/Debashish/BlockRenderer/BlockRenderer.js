import React, { useEffect, useState } from "react";
import EditorJs from "react-editor-js";
import "./BlockRenderer.css";
import { Link } from "react-router-dom";
import { isOwner, dropDownMenu } from "./eventHandlers";
import { MdMoreVert, MdArrowBack } from "react-icons/md";

function BlockRenderer({ userName, paramName, data }) {
  const [moreBtnTog, toggleMoreBtn] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

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

  useEffect(() => {
    setIsOwned(isOwner(userName, paramName));
  }, []);

  return (
    <div className="ebr-container">
      <div className="ebr-container-header">
        <span className="ebr-heading">
          {data.title != null ? <h2>{data.title}</h2> : <></>}
        </span>

        <div className="ebr-options">
          {moreBtnTog ? (
            <>
              <span className="ebr-icons" onClick={() => toggleMoreBtn(false)}>
                <MdArrowBack />
              </span>
              {dropDownMenu(isOwned)}
            </>
          ) : (
            <span className="ebr-icons" onClick={() => toggleMoreBtn(true)}>
              <MdMoreVert />
            </span>
          )}
        </div>

        <span className="ebr-author">
          - by <Link to={`/feed/${data.username}`}>{data.username}</Link>
        </span>
        <span className="ebr-location">{data.location}</span>
      </div>

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

export default React.memo(BlockRenderer);
