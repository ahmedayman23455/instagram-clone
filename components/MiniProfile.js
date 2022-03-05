import React from "react";
import classes from "./miniprofile.module.scss";
import {  useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();   

  return (
    <div className={classes.miniProfile}>
      {/* user */}
      <div className={classes.miniProfile__user}>
        <img
          // src="https://whatsondisneyplus.com/wp-content/uploads/2021/06/luca-avatar-WODP.png"
          src={session?.user?.image}
          alt="person photo"
        />

        <div className={classes.miniProfile__userData}>
          <h2>{session?.user?.username}</h2>
          <h3>Welcome to instagram</h3>
        </div>
      </div>
      {/* logout  */}
      <button>Log Out</button>
    </div>
  );
}

export default MiniProfile;
