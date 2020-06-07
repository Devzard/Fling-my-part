import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
const path = "https://my-fling.herokuapp.com";

const postDeleteHandler = (postId, userId, recogniser) => {
  axios
    .delete(`${path}/feed/delete`, {
      _id: postId,
      _user_id: userId,
      recogniser: recogniser,
    })
    .then((res) => {
      window.location.reload(false);
    })
    .catch((err) => console.error(err));
};

const reportHandler = (postId, userId) => {
  axios
    .patch(`${path}/feed/report`, {
      postId: postId,
      _user_id: userId,
    })
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
  let reportedPosts = Cookies.get("fg_reported") || [];
  if (reportedPosts.length != null && reportedPosts.length > 0)
    reportedPosts = JSON.parse(reportedPosts);

  reportedPosts.push(postId);

  Cookies.set("fg_reported", JSON.stringify(reportedPosts), { expires: 365 });
};

const isReported = (postId) => {
  let res = false;
  let reportedPosts = Cookies.get("fg_reported") || [];
  if (reportedPosts.length != null && reportedPosts.length > 0) {
    reportedPosts = JSON.parse(reportedPosts);
    for (let i = 0; i < reportedPosts.length; i++) {
      if (reportedPosts[i] == postId) res = true;
    }
  }
  return res;
};

export const isOwner = (userName, paramName) => {
  if (userName == paramName) return true;
  else return false;
};

export const dropDownMenu = (isOwned, postId, recogniser, toggleMoreBtn) => {
  const userId = Cookies.get("_user_id");

  return (
    <div className="ebr-dropdown animated fadeInDown">
      {userId != null ? (
        <ul>
          {isOwned ? (
            <li onClick={() => postDeleteHandler(postId, userId, recogniser)}>
              Delete
            </li>
          ) : (
            <></>
          )}
          {!isReported(postId) ? (
            <li
              onClick={() => {
                toggleMoreBtn(false);
                reportHandler(postId, userId);
              }}
            >
              Report
            </li>
          ) : (
            <></>
          )}
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
