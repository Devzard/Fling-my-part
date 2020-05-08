import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DG_everyPost() {
  //send its own request and retrieve posts with comments
  let { id } = useParams();

  return <div>hey{console.log(id)}</div>;
}

export default React.memo(DG_everyPost);
