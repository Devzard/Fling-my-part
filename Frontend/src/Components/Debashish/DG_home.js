import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function DG_home() {
  useEffect(() => {
    Cookies.set("_user_id", "45", { expires: 7 });
    Cookies.set("username", "Debashish Gogoi", { expires: 7 });
    Cookies.set("location", "Jorhat Engineering College");
    Cookies.set("isLoggedIn", "true");
  }, []);
  return <div>Home</div>;
}

export default React.memo(DG_home);
