import React from "react";
import Image from "next/image";
import classes from "./header.module.scss";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggle } from "../redux-slices/modal-slice";

function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  return (
    <div className={`${classes.header_wrapper}`}>
      <div className={classes["header"]}>
        {/* left */}
        <div
          className={`${classes.logo} ${classes.large_logo}`}
          onClick={() => router.push("/")}
        >
          <Image src="/735145cfe0a4.png" layout="fill" objectFit="contain" />
        </div>

        <div
          className={`${classes.logo} ${classes.small_logo}`}
          onClick={() => router.push("/")}
        >
          <Image
            src="/5ecec78673e4440004f09e77.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* middle */}
        <div className={`${classes.header_search}`}>
          <div className={`${classes.icon}`}>
            <SearchIcon />
          </div>
          <input type="text" placeholder="Search" />
        </div>

        {/* right */}
        <div className={`${classes.icons}`}>
          <HomeIcon onClick={() => router.push("/")} />
          <MenuIcon />
          {session ? (
            <>
              <div className={`${classes.directIcon}`}>
                <PaperAirplaneIcon />
                <div className={`${classes.directIcon_number}`}>3</div>
              </div>
              <PlusCircleIcon onClick={() => dispatch(toggle())} />
              <UserGroupIcon />
              <HeartIcon />
              <img
                // src="https://whatsondisneyplus.com/wp-content/uploads/2021/06/luca-avatar-WODP.png"
                src={session.user.image}
                onClick={signOut}
                alt="person photo"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
