

import "./UpdateReview.css"


const UpdateReviewForm = () => {
  return (
    <div id="form-container-update-review">
      <div id="review-form-b ackground">
        <h1>Update Your Stay</h1>

        <div id="buttons-container-review">
          <button
            type="button"
            id="leave-review-button-close"
            className="review-buttons"
          >
            Close
          </button>
          <button
            type="submit"
            id="leave-review-button-submit"
            className="review-buttons"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}


export default UpdateReviewForm;
