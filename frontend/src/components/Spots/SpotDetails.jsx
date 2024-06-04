import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getASpot } from "../../store/spots";
import { useEffect } from "react";
import "./SpotDetails.css";


const SpotDetails = () => {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch, spotId]);

  return (
    <div id="spot-details-container">
      <h2 id="spot-name">{spot.name}</h2>
      <h3 id="spot-location">{spot.city}, {spot.state}, {spot.country}</h3>
      <span id="spot-address">{spot.address}</span>
      <div id="spot-images-container">
        {spot.SpotImages &&
          <img className="big-image" src={spot.SpotImages[0].url} alt="big-spot-image" />
        }
        {spot.SpotImages && spot.SpotImages.slice(1, 5).map((image, index) => (
          <img
            key={image.id}
            className={`small-image small-image-${index + 1}`}
            src={image.url}
            alt={`small-spot-image}`}
          />
        ))}
      </div>
      <div id="description-reviews-container">
        <p id="spot-description">{spot.description}</p>
        <div id="reviews-container">
          <div id="price-container">
            <span id="spot-details-price">${spot.price}</span>
            <span id="night-text">night</span>
          </div>
          <span id="number-of-reviews">{spot.numReviews} reviews</span>
          <span id="average-star-rating">{spot.avgStarRating}</span>
          <button id="booking-button">Book</button>
        </div>
      </div>
    </div>
  );
}


export default SpotDetails
