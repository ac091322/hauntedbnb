import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getASpot } from "../../store/spots";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./SpotDetails.css";


const SpotDetails = () => {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getASpot(spotId));
  }, [dispatch, spotId]);

  return (
    <>
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
          <div id="description-container">
            <h2 id="spot-host">Hosted by... { }</h2>
            <p id="spot-description">{spot.description}</p>
          </div>
          <div id="reviews-container">
            <div id="price-container">
              <span id="spot-details-price">${spot.price}</span>
              <span id="night-text">night</span>
            </div>
            <span id="number-of-reviews">{spot.numReviews} reviews</span>
            <div id="star-rating-container">
              <span>{spot.avgStarRating}</span>
              <FaStar id="star-icon" />
            </div>
            <button id="booking-button"
              type="button"
              onClick={() => setShowPopup(true)}
            >Reserve</button>
          </div>
        </div>
        {showPopup && <div id="popup-container">
          <div id="inner-popup-container">
            <div>Feature coming soon!</div>
            <button id="close-button"
              onClick={() => setShowPopup(false)}
            >Close</button>
          </div>
        </div>
        }
      </div>
    </>
  );
}


export default SpotDetails
