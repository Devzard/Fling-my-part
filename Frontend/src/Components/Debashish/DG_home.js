import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function DG_home() {
  useEffect(() => {
    Cookies.set("_user_id", "5ebd3edf5508ca9bb2ad2ea2"); //{expires : 7}
    Cookies.set("username", "testuser"); //{expires : 7}
    Cookies.set("name", "Test User");
    Cookies.set("location", "Global");
    Cookies.set("isLoggedIn", "true");
  }, []);
  return <div>Home</div>;
}

export default React.memo(DG_home);
