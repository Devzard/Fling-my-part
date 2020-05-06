import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function DG_home() {
  useEffect(() => {
    Cookies.set("_user_id", "45", { expires: 7 });
  }, []);
  return <div>Home</div>;
}

export default DG_home;
