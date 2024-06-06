import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { RiAccountPinCircleLine } from "react-icons/ri";
import "./ProfileButton-bonus.css";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // keep from bubbling up to document and triggering closeMenu
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
          <><Link to="" id="create-spot-link">
            Create a Spot
          </Link></>
        )}
        <><RiAccountPinCircleLine id="profile-button" onClick={toggleMenu} /></>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="drop-down-container">
              <li>Hello, {user.firstName}</li>
              <hr />
              <li>Username: {user.username}</li>
              <hr />
              <li>{user.email}</li>
              <hr />
              <button id="logout-button" onClick={logout}>Log out</button>
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
