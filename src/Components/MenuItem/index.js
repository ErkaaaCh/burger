import React from "react";
import { NavLink } from "react-router-dom";
import css from "./style.module.css";

const MenuItem = ({ link, children, exact }) => (
  <li className={css.MenuItem}>
    <NavLink
      exact={exact}
      className={({ isActive }) =>
        isActive ? `${css.MenuItem} ${css.active}` : css.MenuItem
      }
      to={link}
    >
      {children}
    </NavLink>
  </li>
);

export default MenuItem;
