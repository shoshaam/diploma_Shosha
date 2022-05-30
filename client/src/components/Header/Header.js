import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import WrapperLink from "../../HOCS/WrapperLink";
import ProfileSelect from '../ProfileSelect';
import styles from "./Header.module.scss";

const ADMIN = "admin";

const Header = ({ currentUser }) => {
  const history = useHistory();
  const role = currentUser.data.role ? currentUser.data.role : false;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.navigation}>
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <WrapperLink
                  condition={true}
                  title="Главная"
                  to="/Home"
                  activeClassName={styles.active}
                />
              </li>
              <li className={styles.li}>
                <WrapperLink
                  condition={true}
                  title="Каталог"
                  to="/Catalog"
                  activeClassName={styles.active}
                />
              </li>
              <li className={styles.li}>
                <WrapperLink
                  condition={!role}
                  title="Вход"
                  to="/SignIn"
                  activeClassName={styles.active}
                />
              </li>
              <li className={styles.li}>
                <WrapperLink
                  condition={!role}
                  title="Регистрация"
                  to="/SignUp"
                  activeClassName={styles.active}
                />
              </li>
              <li className={styles.li}>
                <WrapperLink
                  condition={role === ADMIN}
                  title="Добавить"
                  to="/AddLandmark"
                  activeClassName={styles.active}
                />
              </li>
              {role && (
                <div className={styles.profile}>
                  <ProfileSelect />
                </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(Header);
