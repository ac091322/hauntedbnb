import "./Footer.css"


const Footer = () => {
 const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        © {currentYear} hauntedbnb, inc.
      </div>
    </footer>
  )
}


export default Footer;
