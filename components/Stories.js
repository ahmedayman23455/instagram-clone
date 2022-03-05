import React, { useEffect, useRef, useState } from "react";
import classes from "./stories.module.scss";
import faker from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";


import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";

function Stories() {
  const [suggestions, setSuggestions] = useState(null);
  const storiesRef = useRef();
  const [showArrowLeft, setShowArrowLeft] = useState(false);
  const [showArrowRight, setShowArrowRight] = useState(true);
  const { data: session } = useSession();
  /* ------------ useEffect ----------- */
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i + 1,
    }));
    setSuggestions(suggestions);
  }, []);

  /* ---------- scrollHandler --------- */
  const scrollHandler = () => {


    if (storiesRef.current.scrollLeft < 10) {
      setShowArrowLeft(false);
    } else {
      setShowArrowLeft(true);
    }

    if (
      storiesRef.current.scrollLeft >
      storiesRef.current.scrollWidth - storiesRef.current.clientWidth - 1
    ) {
      setShowArrowRight(false);
    } else {
      setShowArrowRight(true);
    }
  };

  /* -------- arrowLeftHandler -------- */
  const arrowLeftHandler = () => {
    storiesRef.current.scrollLeft -= 300;
  };
  /* -------- arrowRightHandler ------- */
  const arrowRightHandler = () => {
    storiesRef.current.scrollLeft += 300;
  };

  /* ---------- return method --------- */
  return (
    <div className={`${classes.stories}`}>
      {/*  stories main  */}
      <div
        className={`${classes.stories__main}`}
        ref={storiesRef}
        onScroll={scrollHandler}
      >
        {session &&  
          <Story img={session.user.image} username={session.user.name}/>
        }
        {suggestions &&
          suggestions.map((profile) => (
            <Story
              key={profile.id}
              img={profile.avatar}
              username={profile.username}
            />
          ))}
      </div>

      {/*  storeis icons  */}
      <div className={`${classes.arrows}`}>
        <button
          className={`${classes.leftArrow} ${
            showArrowLeft ? classes.visible : classes.invisible
          }`}
          onClick={arrowLeftHandler}
        >
          <ArrowCircleLeftIcon />
        </button>
        <button
          className={`${classes.rightArrow} ${
            showArrowRight ? classes.visible : classes.invisible
          }`}
          onClick={arrowRightHandler}
        >
          <ArrowCircleRightIcon />
        </button>
      </div>
    </div>
  );
}

export default Stories;
