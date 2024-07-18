import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Link to="/privacy-policy">Privacy Policy</Link>
      <span>© {currentYear} hauntedbnb, inc.s</span>
    </footer>
  );
}


export default Footer;
