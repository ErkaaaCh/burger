import React from "react";
import css from "./style.module.css";
import Logo from "../Logo";
import Menu from "../Menu";
import HunburgerMenu from "../HunburgerMenu";

const Toolbar = (props) => (
  <header className={css.Toolbar}>
    <HunburgerMenu toggleSideBar={props.toggleSideBar} />
    <Logo />
    <nav className={css.HideOnMobile}>
      <Menu />
    </nav>
  </header>
);

export default Toolbar;
