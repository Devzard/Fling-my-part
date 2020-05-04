import React from "react";
import { GiCancel } from "react-icons/gi";

const DG_addPost_template = ({
  setTemplate,
  bgTemplates,
  toggleTemplateTog,
}) => {
  return (
    <div className="dg-ap-template-bar animated fadeInDown">
      <button className="" onClick={() => toggleTemplateTog(false)}>
        <GiCancel />
      </button>
      {bgTemplates.map((item, index) => {
        return (
          <div
            key={index}
            className={`${item}`}
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
