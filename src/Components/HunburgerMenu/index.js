import React from "react";
import css from "./style.module.css";

const HunburgerMenu = (props) => (
  <div onClick={props.toggleSideBar} className={css.HunburgerMenu}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default HunburgerMenu;
