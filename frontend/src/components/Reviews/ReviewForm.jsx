import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { submitReview } from "../../store/reviews";
import "./ReviewForm.css";

const ReviewForm = ({ spotId, onClose, onReviewSubmit }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [validations, setValidations] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    let formErrors = {};
    if (text.length < 10) formErrors.text = "Review is too short";
    if (!rating) formErrors.rating = "Blood-rating is required";
    setValidations(formErrors);
  }, [text, rating]);

  const handleIconClick = (newRating) => {
    setRating(newRating);
    setSubmit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (text.length < 10) formErrors.text = "Review is too short";
    if (!rating) formErrors.rating = "Blood-rating is required";
    setValidations(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return formErrors;
    }

    const review = {
      review: text,
      stars: rating,
      userId: currentUser.id
    };

    dispatch(submitReview(spotId, review))
      .then(() => {
        onReviewSubmit()
        onClose()

      });
  };

  if (!currentUser) return null;

  return (
    <div className="popup-container-reserve-review" onClick={onClose}>
      <div
        id="review-form-background"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>How was your stay?</h1>
        <form id="form-container-review" onSubmit={handleSubmit}>

          <div id="review-textarea-container">
            <textarea
              id="leave-review-textarea"
              placeholder=" Leave your review here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {submit && validations.text && <span className="form-error-text">{validations.text}</span>}
          </div>

          <div id="blood-rating-container">
            <span>Blood-drop rating:</span>
            <div className="rating-input">
              <div
                className={hoverRating >= 1 || rating >= 1 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(1)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div
                className={hoverRating >= 2 || rating >= 2 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(2)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(2)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div
                className={hoverRating >= 3 || rating >= 3 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(3)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(3)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div
                className={hoverRating >= 4 || rating >= 4 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(4)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(4)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div
                className={hoverRating >= 5 || rating >= 5 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(5)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(5)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
            </div>
            {submit && validations.rating && <span className="form-error-text">{validations.rating}</span>}
          </div>

          <div id="buttons-container-review">
            <button
              type="button"
              className="review-buttons"
              onClick={onClose}>
              Close
            </button>
            <button
              type="submit"
              className={`review-buttons ${Object.values(validations).length > 0 ? 'disabled' : ''}`}
              disabled={Object.values(validations).length > 0}
            >
              Submit
            </button>
          </div>

        </form>
      </div >
    </div >
  );
};


export default ReviewForm;
