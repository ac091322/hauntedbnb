import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import "./PageNotFound.css"


const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div id="page-container-page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button
        type="button"
        id="view-spots-button"
        onClick={() => navigate("/spots", { replace: true })}
      >
        View All Spots <FaArrowCircleRight />
      </button>
    </div>
  );
}


export default PageNotFound;
