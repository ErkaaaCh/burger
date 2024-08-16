import React, { Fragment } from "react";
import css from "./style.module.css";
import MenuItem from "../MenuItem";
import { connect } from "react-redux";
const Menu = (props) => (
  <div>
    <ul className={css.Menu}>
      {props.userID ? (
        <Fragment>
          <MenuItem active link="/">
            ШИНЭ ЗАХИАЛГА
          </MenuItem>

          <MenuItem link="/orders">ЗАХИАЛГАНУУД</MenuItem>
          <MenuItem link="/logout">ГАРАХ</MenuItem>
        </Fragment>
      ) : (
        <Fragment>
          <MenuItem link="/login">НЭВТРЭХ</MenuItem>
          <MenuItem link="/signup">БҮРТГҮҮЛЭХ</MenuItem>
        </Fragment>
      )}
    </ul>
  </div>
);
const mapStateToProps = (state) => {
  return {
    userID: state.signupReducer.userID,
  };
};
export default connect(mapStateToProps)(Menu);
