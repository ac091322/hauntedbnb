const LOAD_REVIEWS = "REVIEWS/load_reviews"

export const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
  }
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const reviews = await res.json();
      dispatch(loadReviews(reviews));
      return reviews;
    } else {
      const error = await res.json();
      console.error(error)
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

let initialState = {};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_REVIEWS: {
      const reviewsState = { ...state };
      action.reviews.Reviews.forEach(review => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    }

    default:
      return state;
  }
};
