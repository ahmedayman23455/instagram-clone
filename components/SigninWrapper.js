import React from "react";
import classes from "./signwrapper.module.scss";

function SigninWrapper({ children }) {
  return (
    <div className={classes.signinWrapper}>
      <div className={classes.signinSection}>
        <div className={classes.image}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
            alt=""
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default SigninWrapper;
