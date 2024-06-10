import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "REVIEWS/load_reviews";
const SUBMIT_REVIEW = "REVIEWS/submit-review";

export const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
  }
};

export const reviewForm = (review) => {
  return {
    type: SUBMIT_REVIEW,
    review
  }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`, {
    method: "GET"
  });

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
    return reviews;

  } else {
    const error = await res.json();
    console.error(error)
  }
};

export const submitReview = (spotId, reviewData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewData)
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(reviewForm(review));
    dispatch(getSpotReviews(spotId));
    return review;

  } else {
    const error = await res.json();
    console.error(error);
  }
};

let initialState = {};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_REVIEWS: {
      const reviewsState = { ...state };
      action.reviews.Reviews
        .forEach(review => {
          reviewsState[review.id] = review;
        });
      return reviewsState;
    }

    case SUBMIT_REVIEW: {
      const reviewFormState = { ...state };
      reviewFormState[action.review.id] = action.review;
      return reviewFormState;
    }

    default:
      return state;
  }
};
