import React from "react";

import styles from "./ListMenu.module.scss";

const ListMenu = ({ content, onClickHandler }) => {
  const onClickItem = (event) => {
    onClickHandler(event.target.getAttribute('value'));
  };
  return (
    <>
      <div className={styles.list}>
        <ul className={styles.ul_container}>
          {content.map((item) => {
            return (
              <li onClick={onClickItem} value={item} className={styles.item}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ListMenu;
