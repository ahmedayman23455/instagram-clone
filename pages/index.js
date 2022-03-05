import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { selectIsOpen } from "../redux-slices/modal-slice";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

function Home() {
  const ModalIsOpen = useSelector(selectIsOpen);

  return (
    <div>
      <Header />
      <Feed />
      <AnimatePresence>{ModalIsOpen && <Modal />}</AnimatePresence>
    </div>
  );
}
export default Home;
