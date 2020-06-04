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

export const getViews = (views) => {
  if (views < 1000) return <>{views}</>;
  else if (views > 1000) return <>{(views / 1000).toFixed(1)}k</>;
  else if (views > 1000000) return <>{(views / 1000000).toFixed(1)}m</>;
  else if (views > 1000000000) return <>{(views / 1000000000).toFixed(1)}b</>;
};
