import { useEffect } from "react";
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
          <img id="spot-image" src={spot.previewImage} alt="spot image" />
          <div className="spot-content-container">
            <span id="location" className="spot-text">{spot.city}, {spot.state}</span>
            <span id="price" className="spot-text">${spot.price} night</span>
            <span id="rating" clasName="spot-text">{spot.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


export default SpotsListing;
