import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, deleteReview } from "../../store/reviews";
import { getAllSpots } from "../../store/spots";
import UpdateReviewForm from "./UpdateReview";
import { TbDropletFilled } from "react-icons/tb";
import { FaArrowCircleRight } from "react-icons/fa";
import "./ManageReviews.css";


const ManageReviews = () => {
  const dispatch = useDispatch();
  const reviewsObj = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsObj);
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const currentUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllSpots());
  }, [dispatch]);

  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToUpdate, setReviewToUpdate] = useState(null);

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    setReviewToDelete(null);
  }

  const onDeletePopup = (reviewId) => {
    setReviewToDelete(reviewId);
  }

  const closeDeletePopup = () => {
    setReviewToDelete(null);
  }

  const onUpdatePopup = (reviewId) => {
    setReviewToUpdate(reviewId);
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const month = months[dateTime.getMonth()];
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return `${month} ${day}, ${year} @ ${formattedTime}`;
  };

  const filteredReviews = useMemo(() => {
    if (currentUser) {
      return reviews.filter(review => review.userId === currentUser.id);
    }
    return [];
  }, [currentUser, reviews]);

  return (
    <div id="page-container-manage-reviews">
      <h1>Manage Reviews</h1>

      {filteredReviews.length === 0 &&
        <div id="view-spots-container">
          <p>You haven&apos;t left any reviews yet, let&apos;s start by searching for a spot using the button below.</p>
          <button
            type="button"
            id="view-spots-button"
            onClick={() => navigate("/spots")}
          >
            View All Spots <FaArrowCircleRight />
          </button>
        </div>
      }

      <div id="current-user-reviews-container">
        {filteredReviews.map(review => {
          const spot = spots.find(spot => (spot.id === review.spotId));

          return (
            <div
              key={review.id}
              id="individual-reviews-container">
              <h3>{spot && spot.name}</h3>
              <span id="review-date">{formatDateTime(review.updatedAt)}</span>
              <span>{spot && spot.city}, {spot && spot.state}</span>
              <div id="star-rating-blod-container-manage-spots">
                <span>{review.stars}.0&nbsp;</span>
                <TbDropletFilled className="blood-icon" />
              </div>
              <p>{review.review}</p>

              <div id="crud-reviews-buttons-container">
                <button
                  type="button"
                  onClick={() => onDeletePopup(review.id)}
                >
                  Delete Review
                </button>
                <button
                  type="button"
                  onClick={() => onUpdatePopup(review.id)}
                >
                  Update Review
                </button>
              </div>

              {reviewToDelete === review.id && (
                <div
                  type="button"
                  id="popup-container-delete-review"
                  onClick={closeDeletePopup}
                >
                  <div
                    id="delete-review-popup-background"
                    onClick={e => e.stopPropagation()}
                  >
                    <h1>Delete Review</h1>
                    <p>Are you sure you want to delete this review?</p>
                    <div id="delete-review-buttons-container">
                      <button
                        type="button"
                        id="delete-review-button-no"
                        className="delete-review-buttons"
                        onClick={closeDeletePopup}
                      >No, Keep
                      </button>
                      <button
                        type="submit"
                        id="delete-review-button-yes"
                        className="delete-review-buttons"
                        onClick={() => handleDelete(review.id)}
                      >Yes... Delete</button>
                    </div>
                  </div>
                </div>
              )}

              {reviewToUpdate === review.id && (
                <UpdateReviewForm
                  value={reviewToUpdate}
                  spoId={review.spotId}
                  reviewId={review.id}
                  onClose={() => setReviewToUpdate(false)}
                />
              )}
            </div>
          )
        })}
      </div>

    </div>
  );
}


export default ManageReviews;
