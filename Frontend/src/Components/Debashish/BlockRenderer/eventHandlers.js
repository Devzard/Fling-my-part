import React from "react";
import Cookies from "js-cookie";

export const isOwner = (userName, paramName) => {
  if (userName == paramName) return true;
  else return false;
};

export const dropDownMenu = (isOwned) => {
  const Cook = Cookies.get("_user_id");

  return (
    <div className="ebr-dropdown animated fadeInDown">
      {Cook != null ? (
        <ul>
          {isOwned ? <li>Delete</li> : <></>}
          {!isOwned ? <li>Report</li> : <></>}
        </ul>
      ) : (
        <ul>
          <li>Not Logged in</li>
        </ul>
      )}
    </div>
  );
};
