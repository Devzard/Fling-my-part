import React from "react";

export const isOwner = (userId, paramId) => {
  if (userId == paramId) return true;
  else return false;
};

export const dropDownMenu = (isOwned) => {
  return (
    <div className="ebr-dropdown">
      <ul>
        <li>hey</li>
        <li>hey</li>
        <li>hey</li>
      </ul>
    </div>
  );
};
