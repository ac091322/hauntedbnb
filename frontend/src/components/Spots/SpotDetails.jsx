import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { LuDot } from "react-icons/lu";
import Loader from "../Loader/Loader";
import { getASpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../Reviews/ReviewForm";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./SpotDetails.css";


const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const currentUser = useSelector(state => state.session.user);
  const reviewsObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsObj);

  const [showReservePopup, setShowReservePopup] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getASpot(spotId))
      .then(() => dispatch(getSpotReviews(spotId)))
      .finally(() => setLoading(false));
  }, [dispatch, spotId]);

  const handleReviewSubmit = () => {
    dispatch(getASpot(spotId));
    dispatch(getSpotReviews(spotId));
  };

  const handleReviewDelete = () => {
    dispatch(getASpot(spotId));
    dispatch(getSpotReviews(spotId));
  };

  if (loading) return <Loader />

  if (isNaN(parseInt(spotId)) || !spot || !spot.id) return <PageNotFound />;

  const priceWithComma = new Intl.NumberFormat().format(spot.price);

  return (
    <>
      <div id="spot-details-container">
        <h2 id="spot-name">{spot.name}</h2>
        <h3 id="spot-location">{spot.city}, {spot.state}, {spot.country}</h3>
        <span id="spot-address">{spot.address}</span>

        <div id="images-container">
          {spot.SpotImages && (
            <>
              <img
                className="big-image"
                src={spot.SpotImages.find(image => image.preview)?.url}
                alt="big-spot-image"
              />

              <div id="small-images-container">
                {spot.SpotImages
                  .filter(image => !image.preview)
                  .slice(0, 4)
                  .map((image, index) => (
                    <img
                      key={image.id}
                      className={`small-image small-image-${index + 1}`}
                      src={image.url}
                      alt={`small-spot-image`}
                    />
                  ))
                }
              </div>
            </>
          )}
        </div>

        <div id="description-details-container">
          <div id="description-details-left-container">
            <h2>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
            <p>{spot.description}</p>
          </div>

          <div id="description-details-right-container">
            <div id="price-rating-review-container">
              <div id="price-container">
                <span id="spot-price">${priceWithComma}</span>
                <span>&nbsp;night</span>
              </div>

              <div id="rating-review-container">
                <span>
                  {Number.isInteger(spot.avgStarRating) ? `${spot.avgStarRating}.0` : spot.avgStarRating}
                </span>
                <TbDropletFilled className="blood-icon" />
                {spot.numReviews === 0 ? <>New spot!</> : <></>}
                <LuDot id="dot-top" />
                {spot.numReviews} {spot.numReviews === 1 ? <>review</> : <>reviews</>}
              </div>
            </div>

            <button
              type="button"
              id="button-reserve"
              onClick={() => setShowReservePopup(true)}
            >Reserve</button>
          </div>
        </div>
      </div>

      {showReservePopup && <div
        className="popup-container-reserve-review"
        onClick={() => setShowReservePopup(false)}
      >
        <div
          id="reserve-form-background"
          onClick={e => { e.stopPropagation() }}
        >
          <h1>Reserve</h1>
          <div id="feature-text">Feature coming soon!</div>
          <button
            type="button"
            id="reserve-button-close"
            onClick={() => setShowReservePopup(false)}
          >Close</button>
        </div>
      </div>}

      <hr id="section-separator" />

      <div id="ratings-container-bottom">
        <div id="ratings-subcontainer">
          <span>
            {Number.isInteger(spot.avgStarRating) ? `${spot.avgStarRating}.0` : spot.avgStarRating}
          </span>
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

        {spot.numReviews === 0 &&
          currentUser
          && currentUser.id !== spot.ownerId
          ?
          <span>Be the first to post a review!</span>
          :
          <></>}

        {reviews.some(review => (
          review.userId === currentUser?.id && review.spotId === spotId
        ))}

        <button
          type="button"
          id="button-review"
          hidden={
            !currentUser ||
            currentUser.id === spot.ownerId ||
            reviews.some(review => review.spotId === spot.id && review.userId === currentUser.id)
          }
          onClick={() => setShowReviewPopup(true)}
        >
          Leave Review
        </button>
      </div >

      {showReviewPopup && (
        <ReviewForm
          value={showReviewPopup}
          spotId={spotId}
          onClose={() => setShowReviewPopup(false)}
          onReviewSubmit={handleReviewSubmit}
        />
      )}

      <div id="reviews-container-spot-details-page">
        {reviews
          .sort((a, b) => (b.id) - (a.id))
          .map(review => (
            review.spotId === spot.id ?
              <Reviews
                review={review}
                key={review.id}
                onDelete={handleReviewDelete}
              />
              :
              null
          ))}
      </div>
    </>
  );
}


export default SpotDetails
