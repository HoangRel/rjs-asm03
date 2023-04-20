import { createPortal } from "react-dom";

import { useDispatch } from "react-redux";
import { popupActions } from "../../store/popup";

import { CartIcon } from "../../icons/icons";

import styles from "./Popup.module.css";

const Popup = ({ data }) => {
  const dispatch = useDispatch();

  const hidePopupHandler = () => {
    dispatch(popupActions.hidePopup());
  };

  const Backdrop = () => {
    return <div className={styles.backdrop} onClick={hidePopupHandler}></div>;
  };

  const Overlay = ({ data }) => {
    return (
      <div className={styles.overlay}>
        <div>
          <img src={data.img1} alt={data.name} />
        </div>
        <div className={styles.detail}>
          <div>
            <div>
              <h1>{data.name}</h1>
              <p>{data.price}</p>
              <blockquote>{data.short_desc}</blockquote>
            </div>
            <button>
              <i>
                <CartIcon />
              </i>
              View Detail
            </button>
          </div>

          <p className={styles.x} onClick={hidePopupHandler}>
            <strong>X</strong>
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {createPortal(<Backdrop />, document.getElementById("popup"))}
      {createPortal(<Overlay data={data} />, document.getElementById("popup"))}
    </>
  );
};

export default Popup;
