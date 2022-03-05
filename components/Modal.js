import React, { useRef, useState } from "react";
import classes from "./modal.module.scss";
import { useDispatch } from "react-redux";
import { toggle } from "../redux-slices/modal-slice";
import { motion } from "framer-motion";
import { UploadIcon, XIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const dispatch = useDispatch();
  const filePickerRef = useRef(null);
  const captionRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  /* ------------ variants ------------ */
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
  /* ----------- uploadPost ----------- */
  const uploadPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // 1 - create a post and add to firestore posts collection
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    // 2- get the post id for the newely created post
    // console.log("🚀 ~ file: Modal.js ~ line 35 ~ docRef ~ docRef", docRef.id) ;     

    // 3- upload the image to firebase storage with the post id
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {

        // 4- get a download URL from fb storage and update the original post with image
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    dispatch(toggle());
    setLoading(false);
    setSelectedFile(null);
  };
  /* --------- addImageToPost --------- */
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  /* ---------------------------------- */
  return (
    <motion.div
      className={classes.modal__overlay}
      onClick={() => dispatch(toggle())}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* modal Cotnent */}
      <div
        className={classes.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal header */}
        <div className={classes.modal__header}>
          <h1>Create new post</h1>
          {selectedFile && (
            <button onClick={uploadPost} disabled={!selectedFile}>
              {loading ? "Uploading" : "Upload"}
            </button>
          )}
        </div>
        {/* model main */}
        <div className={classes.model__main}>
          {!selectedFile ? (
            <>
              <UploadIcon />
              <h3>Drag photo </h3>
              <label htmlFor="file"> Select from computer </label>
              <input
                type="file"
                id="file"
                ref={filePickerRef}
                onChange={addImageToPost}
              />
            </>
          ) : (
            <img src={selectedFile} alt="image post" />
          )}


            {selectedFile && 
          <input
            type="text"
            placeholder="Please enter a caption"
            ref={captionRef}
          />
        }
        </div>
      </div>

      {/* close button */}
      <XIcon
        className={classes.xIcon}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggle());
        }}
      />
    </motion.div>
  );
}

export default Modal;
