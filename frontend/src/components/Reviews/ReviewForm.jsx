import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { submitReview } from "../../store/reviews";
import "./ReviewForm.css";

const ReviewForm = ({ spotId, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [validations, setValidations] = useState({});

  const handleIconClick = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (text.length < 10) formErrors.text = "Review can't be too short";
    if (!rating) formErrors.rating = "Blood-rating can't be empty";
    setValidations(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return formErrors;
    }

    const review = {
      review: text,
      stars: rating,
      userId: currentUser.id
    };
    dispatch(submitReview(spotId, review)).then(() => onClose());
  };

  if (!currentUser) return null;

  return (
    <div className="popup-container" onClick={onClose}>
      <div
        id="inner-review-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>How was your stay?</h2>
        <form id="review-form-container" onSubmit={handleSubmit}>
          <textarea
            id="review-text-area"
            placeholder="Leave your review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {Object.values(validations).length > 0 && <span className="review-error-text">{validations.text}</span>}

          <div id="blood-rating-container">
            <span>Blood-drop rating:</span>
            <div className="rating-input">
              <div className={hoverRating >= 1 || rating >= 1 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(1)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div className={hoverRating >= 2 || rating >= 2 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(2)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(2)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div className={hoverRating >= 3 || rating >= 3 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(3)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(3)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div className={hoverRating >= 4 || rating >= 4 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(4)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(4)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
              <div className={hoverRating >= 5 || rating >= 5 ? "filled" : "empty"}
                onMouseEnter={() => setHoverRating(5)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleIconClick(5)}
              >
                <TbDropletFilled className="blood-icon-position" />
              </div>
            </div>

          </div>
          {Object.values(validations).length > 0 && <span className="review-error-text">{validations.rating}</span>}

          <div id="review-buttons-container">
            <button className="review-buttons" type="button" onClick={onClose}>
              Close
            </button>

            <button
              className="review-buttons"
              type="submit"
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
