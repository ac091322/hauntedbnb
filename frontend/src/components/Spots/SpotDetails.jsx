import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { LuDot } from "react-icons/lu";
import { getASpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../Reviews/ReviewForm";
import "./SpotDetails.css";


const SpotDetails = (rating) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector(state => state.spots[spotId]);
  const currentUser = useSelector(state => state.session.user);

  const reviewsObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsObj);

  const [showReservePopup, setShowReservePopup] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    dispatch(getASpot(spotId)).then(() => (dispatch(getSpotReviews(spotId))));
  }, [dispatch, spotId]);

  useEffect(() => {
    setActiveRating(rating)
  }, [rating])

  if (!spot) return null;

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
            <h2>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
            <p>{spot.description}</p>
          </div>

          <div id="reserve-container">
            <div id="price-review-rating-container">
              <div id="price-container">
                <span id="spot-details-price">${spot.price}</span>
                <span>night</span>
              </div>

              <div id="rating-review-container-top">
                <div id="star-rating-container">
                  <span>{spot.avgStarRating}</span>
                  <TbDropletFilled className="blood-icon" />
                  {spot.numReviews === 0 ? <>New spot!</> : <></>}
                </div>
                <LuDot id="dot1" />
                {spot.numReviews} {spot.numReviews === 1 ? <>review</> : <>reviews</>}
              </div>
            </div>

            <button
              id="booking-button"
              type="button"
              onClick={() => setShowReservePopup(true)}
            >Reserve</button>
          </div>

        </div>

      </div>

      {showReservePopup && <div className="popup-container" onClick={() => setShowReservePopup(false)}>
        <div
          id="inner-reserve-container"
          onClick={e => { e.stopPropagation() }}
        >
          <div>Feature coming soon!</div>
          <button
            id="close-button"
            onClick={() => setShowReservePopup(false)}
          >Close</button>
        </div>
      </div>
      }

      <hr id="description-review-separator" />

      <div id="ratings-container">

        <div id="ratings-subcontainer">
          <span>{spot.avgStarRating}</span>
          <TbDropletFilled className="blood-icon" />
          {spot.numReviews === 0 ?
            (<>
              New spot!
            </>
            ) : (
              <>
                out of 5 drops of blood
                <LuDot id="dot2" />
                {spot.numReviews === 1 ? <>{spot.numReviews} review</> : <>{spot.numReviews} reviews</>}
              </>
            )}
        </div>

        {spot.numReviews === 0 && currentUser && currentUser.id !== spot.ownerId ?
          <span>Be the first to post a review!</span>
          :
          <></>}

        {reviews.some(review => (
          review.userId === currentUser?.id && review.spotId === spotId
        ))}

        <button
          id="review-button"
          type="button"
          hidden={
            !currentUser ||
            currentUser.id === spot.ownerId
          }
          onClick={() => setShowReviewPopup(true)}
        >Leave Review
        </button>
      </div >

      {showReviewPopup && (
        <ReviewForm
          spotId={spotId}
          initialRating={activeRating}
          onClose={() => setShowReviewPopup(false)}
        />
      )}

      {reviews.map(review => (
        review.spotId === spot.id ?
          <Reviews review={review} key={review.id} />
          :
          <></>
      ))}
    </>
  );
}


export default SpotDetails
