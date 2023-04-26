import { useState } from "react";
import { createPortal } from "react-dom";

import { MessageIcon, LinkIcon, IconsIcon, SendIcon } from "../../icons/icons";

import admin from "../../images/admin.png";

import styles from "./ChatPopup.module.css";

const ChatPopup = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <i className={styles.icon} onClick={() => setToggle((pre) => !pre)}>
        <MessageIcon />
      </i>
      {toggle && (
        <>
          {createPortal(
            <section className={styles.section}>
              <div className={styles.start}>
                <h4>Customer Support</h4>
                <button>Let's Chat App</button>
              </div>
              <div className={styles.center}>
                <div>
                  <p>Xin chào</p>
                  <p>Làm thế nào để xem các sản phẩm</p>
                </div>
                <div>
                  <div>
                    <img src={admin} alt="admin" />
                    <p>ADMIN: Chào bạn</p>
                  </div>
                  <div>
                    <img src={admin} alt="admin" />
                    <p>ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm</p>
                  </div>
                </div>
              </div>

              <div className={styles.end}>
                <img src={admin} alt="admin" />

                <input placeholder="Enter Message!" />
                <i>
                  <LinkIcon />
                </i>
                <i>
                  <IconsIcon />
                </i>
                <i>
                  <SendIcon />
                </i>
              </div>
            </section>,
            document.getElementById("chat-popup")
          )}
        </>
      )}
    </>
  );
};

export default ChatPopup;
