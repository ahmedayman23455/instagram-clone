import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import classes from "./post.module.scss";
import Caption from "./Caption";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
/* ---------------------------------- */

function Post({ id, username, img, userImg, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  /* ------------ useEffect ----------- */
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {  
    setHasLiked(
     ( likes.findIndex((like) => like.id === session?.user?.uid)) > -1
        ? true
        : false
    );
  }, [likes]);

  /* ----------- sendComment ---------- */
  const sendComment = async (e) => {
    e.preventDefault();
    if (e.target.value.trim().length === 0) {
      return;
    }
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: comment,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    setComment("");
  };
  /* ------------ likePost ------------ */
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      setHasLiked(false);
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
      setHasLiked(true);
    }
  };
  /* ----------------return ------------------ */
  return (
    <div className={classes.post}>
      {/* header */}
      <div className={`${classes.post__header}`}>
        <img src={userImg} alt="person photo" />
        <p>{username}</p>
        <DotsHorizontalIcon />
      </div>

      {/* image */}
      <div className={`${classes.post__image}`}>
        <img src={img} alt="" />
      </div>

      {/* icons */}
      {session && (
        <div className={`${classes.post__icons}`}>
          {!hasLiked && <HeartIcon onClick={likePost} />}
          {hasLiked && (
            <HeartIconFilled onClick={likePost} style={{ color: "red" }} />
          )}
          <ChatIcon />
          <PaperAirplaneIcon />
          <BookmarkIcon />
        </div>
      )}

      <div>
        {/* caption */}

        <Caption caption={caption} name={username} likesLength={likes.length}/>

        {/* comments */}
        {comments.length > 0 && (
          <div className={classes.post__comments}>
            {comments.map((comment) => (
              <div key={comment.id} className={classes.post__comment}>
                <img src={comment.data().userImage} alt="photo" />
                <p>
                  <span> {comment.data().username} </span>{" "}
                  {comment.data().comment}
                  <Moment interval fromNow>
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </p>
              </div>
            ))}
          </div>
        )}
        {/* <span className={classes.post__comments}> View All Comments</span> */}

        {/* input pox   */}
        {session && (
          <div className={`${classes.post__input}`}>
            <EmojiHappyIcon />

            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  sendComment(e);
                }
              }}
            />
            <button type="submit" onClick={sendComment}>
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
