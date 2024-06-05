import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { getASpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import Reviews from "../Reviews/Reviews";
import "./SpotDetails.css";


const SpotDetails = () => {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);

  const reviewsObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsObj);

  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getASpot(spotId)).then(() => (dispatch(getSpotReviews(spotId))));
  }, [dispatch, spotId]);


  if (!spot) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <div id="spot-details-container">

        <h2 id="spot-name">{spot.name}</h2>
        <h3 id="spot-location">{spot.city}, {spot.state}, {spot.country}</h3>
        <span id="spot-address">{spot.address}</span>

        <div id="images-container">
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

          <div id="reserve-container">
            <div id="price-review-rating-container">
              <div id="price-container">
                <span id="spot-details-price">${spot.price}</span>
                <span id="night-text">night</span>
              </div>

              <div id="rating-review-container">
                <div id="star-rating-container">
                  <span>{spot.avgStarRating}</span>
                  <FaStar id="star-icon" />
                </div>
                <LuDot id="dot1" />
                <span>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</span>
              </div>
            </div>

            <button
              id="booking-button"
              type="button"
              onClick={() => setShowPopup(true)}
            >Reserve</button>
          </div>

        </div>

      </div>

      {showPopup && <div id="popup-container" onClick={() => setShowPopup(false)}>
        <div
          id="inner-popup-container"
          onClick={e => { e.stopPropagation() }}
        >
          <div>Feature coming soon!</div>
          <button
            id="close-button"
            onClick={() => setShowPopup(false)}
          >Close</button>
        </div>
      </div>
      }

      <hr id="description-review-separator" />

      <div id="ratings-container">
        <span>{spot.avgStarRating}</span>
        <FaStar id="star-icon" />
        <span>out of 5 stars</span>
        <LuDot id="dot2" />
        <span>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</span>
      </div>

      {reviews.map(review => (
        <Reviews review={review} key={review.id} />
      ))}
    </>
  );
}


export default SpotDetails
