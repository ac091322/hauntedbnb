import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import logo from "../../../public/logo.png"
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="header-container">
      <NavLink to="/"><img src={logo} id="logo"></img></NavLink>
      {isLoaded && <ProfileButton id="profile-button" user={sessionUser} />}
    </nav>
  );
}


export default Navigation;
