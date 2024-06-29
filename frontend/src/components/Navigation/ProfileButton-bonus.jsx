import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { RiAccountPinCircleLine } from "react-icons/ri";
import "./ProfileButton-bonus.css";


function ProfileButton({ user }) {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id="account-menu-container">
      <div id="create-spot-profile-container">
        {user && (
          <>
            <Link className="create-spot-text" to="/spots/create" id="create-spot-link">
              Create a Spot
            </Link>
          </>
        )}
        <><RiAccountPinCircleLine id="profile-button" onClick={toggleMenu} /></>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="drop-down-container">
              <li style={{ cursor: "default" }}>Hello, {user.firstName}</li>
              <hr />
              <li style={{ cursor: "default" }}>Username: {user.username}</li>
              <hr />
              <li style={{ cursor: "default" }}>{user.email}</li>
              <hr />
              <Link
                id="manage-spots-link"
                to={`/spots/${currentUser.id}/manage`}
                onClick={closeMenu}
              >Manage Spots
              </Link>
              <hr />
              <Link id="logout-button" onClick={logout}>Log out</Link>
            </div>
          </>
        ) : (
          <div className="drop-down-container">
            <OpenModalMenuItem
              itemText="Log in"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <hr />
            <OpenModalMenuItem
              itemText="Sign up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}


export default ProfileButton;
