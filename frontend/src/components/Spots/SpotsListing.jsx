import { useEffect, useState } from "react";
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

  return (
    <div id="all-spots-container">
      {spots.map(spot => (
        <div
          key={spot.id}
          onMouseEnter={() => setToolTip(spot.id)}
          onMouseOut={() => setToolTip(null)}
        >
          <Link to={`/spots/${spot.id}`} id="spot-link">
            <img
              id="spot-image"
              src={spot.previewImage}
              alt="spot-image"
            />

            <div
              id="spot-content-container">
              <div id="spot-left-content-container">
                <span >{spot.city}, {spot.state}</span>
                <span >${spot.price} night</span>
              </div>

              <div id="spot-right-content-container">
                {spot.numReviews === 0 ? (
                  <>
                    <TbDropletFilled className="blood-icon" />
                    <span>New spot!</span>
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
