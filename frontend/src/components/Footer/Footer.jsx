import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      © {currentYear} hauntedbnb, inc.s
      <Link to="/privacy-policy">Privacy Policy</Link>
    </footer>
  );
}


export default Footer;
