import React from "react";
import classes from "./story.module.scss";

function Story({ img, username }) {
  return (
    <div className={`${classes.story}`}>
      <div className={`${classes.gradient}`}>
        <div className={`${classes.story__image}`}>
          <img src={img} alt={username} />
        </div>
      </div>
      <p>{username}</p>
    </div>
  );
}

export default Story;
