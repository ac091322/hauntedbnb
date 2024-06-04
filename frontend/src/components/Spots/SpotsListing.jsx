import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./SpotsListing.css"


const SpotsListing = () => {
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div id="spot-container">
      {spots.map(spot => (
        <div key={spot.id}>
          <Link to={`/spots/${spot.id}`}><img id="spot-image" src={spot.previewImage} alt="spot-image" /></Link>
          <div className="spot-content-container">
            <span id="location" className="spot-text">{spot.city}, {spot.state}</span>
            <span id="price" className="spot-text">${spot.price} night</span>
            <span id="rating" className="spot-text">{spot.avgStarRating}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


export default SpotsListing;
