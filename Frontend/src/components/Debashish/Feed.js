import React, { useEffect, useState } from "react";
import AddPostFeed from "./AddPostFeed";
import EachFeed from "./EachFeed";
import "./styles/dg-feed.css";
import Location from "./Location";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      _id: 1,
      category: "General",
      username: "uti",
      name: "Delhi",
      content: "Hey its an amazing site",
      comments: [],
      reportedUsers: [],
      likedUsers: [],
      uploadTime: "10:10",
    },
    {
      _id: 2,
      category: "Rumour",
      username: "jau",
      name: "Visakhapatnam",
      content: "Hey I heard she likes him",
      comments: [],
      reportedUsers: [],
      likedUsers: [],
      uploadTime: "10:10",
    },
    {
      _id: 3,
      category: "Event",
      username: "jau",
      name: "Kashmir",
      content: "Party at my house",
      comments: [],
      reportedUsers: [],
      likedUsers: [],
      uploadTime: "10:10",
    },
  ]);
  const [locations, setLocations] = useState([
    "All",
    "JEC",
    "JB",
    "JIST",
    "DU",
    "GU",
    "MKDG",
    "Cotton",
  ]);
  const [currentLoc, setCurrentLoc] = useState(locations[0]);
  return (
    <div className="dg-feed-container">
      <div className="dg-header">
        <span className="dg-location-feed">
          <Location
            locations={locations}
            setLocations={setLocations}
            setCurrentLoc={setCurrentLoc}
          />
        </span>
        <span className="dg-addpost-feed">
          <AddPostFeed />
        </span>
      </div>
      {posts.map((item, index) => {
        return <EachFeed post={item} key={index} />;
      })}
    </div>
  );
};

export default Feed;
