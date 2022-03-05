import React, { useState } from "react";
import classes from "./caption.module.scss";

function Caption({ name, caption, likesLength }) {
  const [showHideText, setShowHideText] = useState(false);

  const maxLength = 70;
  const length = caption.length;
  const showLikes = likesLength > 0;

  if (length < maxLength) {
    return (
      <div className={classes.caption}>
        {showLikes && (
          <span style={{ fontWeight: "600" }}>{likesLength} likes</span>
        )}
        <p>
          <span className={classes.name}> {name}</span> {caption}
        </p>
      </div>
    );
  } else {
    const displayText = caption.slice(0, maxLength);
    const hideText = caption.slice(maxLength);

    return (
      <div className={classes.caption}>
        {showLikes && (
          <span style={{ fontWeight: "600" }}>{likesLength} likes</span>
        )}
        <p>
          <span className={classes.name}> {name}</span>
          {displayText}
          {!showHideText && <span>...</span>}
          {showHideText && hideText}

          <span
            className={classes.btn}
            onClick={() => {
              setShowHideText((prevState) => !prevState);
            }}
          >
            {!showHideText ? "more" : "less"}
          </span>
        </p>
      </div>
    );
  }
}

export default Caption;
