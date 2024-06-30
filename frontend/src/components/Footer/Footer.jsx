import "./Footer.css"


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      © {currentYear} hauntedbnb, inc.
    </footer>
  )
}


export default Footer;
