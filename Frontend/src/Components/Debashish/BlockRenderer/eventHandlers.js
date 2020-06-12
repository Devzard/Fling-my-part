import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineLink } from "react-icons/ai";
import { DiAndroid } from "react-icons/di";
import { isMobile } from "react-device-detect";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LikedinShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const path = "http://localhost:3300";
// "https://my-fling.herokuapp.com";

const postDeleteHandler = (postId, userId, recogniser) => {
  const data = { _id: postId, _user_id: userId, recogniser: recogniser };
  axios
    .patch(`${path}/feed/delete`, data)
    .then((res) => {
      console.log(res);
      // window.location.reload();
    })
    .catch((err) => {
      console.error(err);
      // window.location.reload();
    });
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

const shareHandler = (url, desc) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Flingazine",
        text: desc,
        url: url,
      })
      .then(() => {})
      .catch((error) => console.error("Error sharing", error));
  } else {
    alert("This feature is not supported in your browser. Try sharing link");
  }
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

export const shareButtons = (url, desc) => {
  return (
    <div className="">
      <span>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={30} round={true} />
        </WhatsappShareButton>
      </span>
      <span>
        <TwitterShareButton url={url}>
          <TwitterIcon size={30} round={true} />
        </TwitterShareButton>
      </span>
      <span>
        <FacebookShareButton url={url}>
          <FacebookIcon size={30} round={true} />
        </FacebookShareButton>
      </span>
      <span>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={30} round={true} />
        </LinkedinShareButton>
      </span>
      <span>
        <EmailShareButton url={url}>
          <EmailIcon size={30} round={true} />
        </EmailShareButton>
      </span>
      <span>
        <CopyToClipboard
          text={url}
          onCopy={() => {
            alert("Link copied to clipboard");
          }}
        >
          <button className="ebr-share-ctc">
            <AiOutlineLink />
          </button>
        </CopyToClipboard>
      </span>
      <span>
        {isMobile ? (
          <span
            onClick={() => shareHandler(url, desc)}
            className="ebr-share-android"
          >
            <DiAndroid />
          </span>
        ) : (
          <></>
        )}
      </span>
    </div>
  );
};

export const updateTime = () => {};
