import React, { useState, useEffect } from "react";
import "./styles/dg-home.css";
import { Link } from "react-router-dom";

function Home() {
  const [news, setNews] = useState("News");

  return (
    <>
      <div class="dg-home-grid">
        <p class="news dg-shade-2">
          <h1>{news}</h1>
        </p>
        <div className="dg-feed dg-shade-1">
          <Link to="/feed">Feed</Link>
        </div>
        <div className="dg-confession dg-shade-1">Confessions</div>
        <div className="dg-gallery dg-shade-1">Fling Gallery</div>
        <div className="dg-fling dg-shade-1">fling</div>
      </div>
    </>
  );
}

export default Home;
