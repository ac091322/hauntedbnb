import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./SpotsListing.css"


const SpotsListing = ({ avgStarRating }) => {

  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const dispatch = useDispatch();

  const [visibleSpotId, setVisibleSpotId] = useState(false);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div id="spot-container">

      {spots.map(spot => (
        <div key={spot.id}
          onMouseEnter={() => setVisibleSpotId(spot.id)}
          onMouseOut={() => setVisibleSpotId(false)}
        >
          <Link to={`/spots/${spot.id}`} id="spot-link">
            <img id="spot-image" src={spot.previewImage} alt="spot-image" />
            <div className="spot-content-container">
              <span id="location" className="spot-text">{spot.city}, {spot.state}</span>
              <span id="price" className="spot-text">${spot.price} night</span>
              <span id="rating" className="spot-text">{avgStarRating}</span>
            </div>
          </Link>

          {visibleSpotId === spot.id && <span id="tooltip">{spot.name}</span>}

        </div>
      ))}
    </div>
  );
}


export default SpotsListing;
