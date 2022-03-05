import React from "react";
import classes from "./feed.module.scss";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed({ data }) {
  const { data: session } = useSession();
  return (
    <main className={`${classes.feed} ${!session && classes.notSignedIn}`}>
      {/* section */}
      <section className={`${classes.feed__main}`}>
        {/* stories */}  
        {session &&  
        <Stories stories={data} />
        }
        {/* posts */}
        <Posts />
      </section>

      {/* section */}
      {session && (
        <section className={`${classes.feed__sidebar}`}>
          <div className={`${classes.feed__sidebarWrapper}`}>
            {/* mini profile */}
            <MiniProfile />
            {/* suggestions */}
            <Suggestions suggestions={data} />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
