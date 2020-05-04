import React from "react";
import "./styles/dg_background_template.css";

const DG_addPost_template = ({
  setTemplate,
  bgTemplates,
  toogleTemplateTog,
}) => {
  return (
    <div className="dg-ap-template-bar">
      {bgTemplates.map((item, index) => {
        return (
          <div
            key={index}
            className={item}
            onClick={() => {
              setTemplate(item);
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default DG_addPost_template;
