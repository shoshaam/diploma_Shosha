import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { blue } from '@mui/material/colors';

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.link_container}>
          Связь:
          <a href="https://github.com/shoshaam" className={styles.link}>
            <GitHubIcon sx={{ color: blue[500] }}/>
            <p>shoshaam</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
