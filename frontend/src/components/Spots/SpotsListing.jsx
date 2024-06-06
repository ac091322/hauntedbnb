import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { getAllSpots } from "../../store/spots";
import "./SpotsListing.css"


const SpotsListing = () => {
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const dispatch = useDispatch();

  const [toolTip, setToolTip] = useState(null);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const handleMouseEnter = useCallback((spotId) => {
    setToolTip(spotId);
  }, []);

  const handleMouseOut = useCallback(() => {
    setToolTip(null);
  }, []);

  return (
    <div id="spot-container">
      {spots.map(spot => (
        <div
          id="individual-spot-container"
          key={spot.id}
          onMouseEnter={() => handleMouseEnter(spot.id)}
          onMouseOut={handleMouseOut}
        >

          <Link to={`/spots/${spot.id}`} id="spot-link">
            <img id="spot-image" src={spot.previewImage} alt="spot-image" />
            <div id="spot-content-container">
              <div id="spot-left-content-container">
                <span id="location" className="spot-text">{spot.city}, {spot.state}</span>
                <span id="price" className="spot-text">${spot.price} night</span>
              </div>

              <div id="spot-right-content-container">
                <span
                  id="rating"
                  className="spot-text">
                </span>
                {spot.numReviews === 0 ? (
                  <>
                    <TbDropletFilled className="blood-icon" />
                    New spot!
                  </>
                ) : (
                  <>{spot.avgStarRating}<TbDropletFilled className="blood-icon" /></>
                )}
              </div>
            </div>
          </Link>
          {toolTip === spot.id && <span id="tooltip">{spot.name}</span>}

        </div >
      ))}
    </div >
  );
}


export default SpotsListing;
