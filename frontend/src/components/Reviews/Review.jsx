import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { deleteReview } from "../../store/reviews";
import "./Review.css";


const Review = ({ review, onDelete }) => {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [reviewToDelete, setReviewToDelete] = useState(null);

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId))
      .then(() => {
        onDelete();
        setReviewToDelete(null);
      });
  };

  const onDeletePopup = (reviewId) => {
    setReviewToDelete(reviewId);
  };

  const closeDeletePopup = () => {
    setReviewToDelete(null);
  };

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

  let firstName = "";
  if (review.User && review.User.firstName) {
    firstName = review.User.firstName;
  } else if (currentUser) {
    firstName = currentUser.firstName;
  }

  return (
    <div id="reviews-page-container">
      <div id="reviews-container">

        <div id="name-rating-container">
          <h3 id="review-name">{firstName}</h3>

          <div id="blood-star-container">
            <span>
              {Number.isInteger(review.stars) ? `${review.stars}.0` : review.stars}
            </span>
            <TbDropletFilled className="blood-icon" />
          </div>
        </div>

        <span id="review-date">{formatDateTime(review.updatedAt)}</span>
        <span>{review.review}</span>

        {review.User && currentUser && currentUser.id === review.userId && (
          <button
            type="button"
            onClick={() => onDeletePopup(review.id)}
          >
            Delete Review
          </button>
        )}

        {reviewToDelete === review.id && (
          <div
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
                >
                  No, Keep
                </button>
                <button
                  type="submit"
                  id="delete-review-button-yes"
                  className="delete-review-buttons"
                  onClick={() => handleDelete(review.id)}
                >
                  Yes... Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div >
  );
};

export default Review;
