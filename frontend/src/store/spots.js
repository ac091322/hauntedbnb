import { csrfFetch } from "./csrf";


const LOAD_SPOTS = "SPOTS/load_spots";
const LOAD_SPOT_DETAILS = "SPOTS/load_spot_detail";
const SUBMIT_SPOT = "SPOTS/submit_spot";
const UPDATE_SPOT = "SPOTS/update_spot";
const REMOVE_SPOT = "SPOTS/remove_spot";
const ADD_SPOT_IMAGES = "SPOTS/submit_spot_images";
const UPDATE_SPOT_IMAGES = "SPOTS/update_spot_images"

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots
  }
};

export const loadSpotDetails = (spot) => {
  return {
    type: LOAD_SPOT_DETAILS,
    payload: spot
  }
};

export const loadNewSpot = (spot) => {
  return {
    type: SUBMIT_SPOT,
    payload: spot
  }
};

export const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot
  }
};

export const removeSpot = (spotId) => {
  return {
    type: REMOVE_SPOT,
    payload: spotId
  }
};

export const loadSpotImages = (spotImages) => {
  return {
    type: ADD_SPOT_IMAGES,
    payload: spotImages
  }
};

export const replaceSpotImages = (spotImages) => {
  return {
    type: UPDATE_SPOT_IMAGES,
    payload: spotImages
  }
};

export const getAllSpots = () => async (dispatch) => {
  try {
    const res = await fetch("/api/spots");

    if (res.ok) {
      const data = await res.json();
      const spots = data.Spots;
      dispatch(loadSpots(spots));
      return spots
    } else {
      const error = await res.json();
      console.error(error);
    }

  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getASpot = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok) {
      const aSpot = await res.json();
      dispatch(loadSpotDetails(aSpot));
      return aSpot;
    } else {
      const error = await res.json();
      console.error(error);
      return error;
    }

  } catch (err) {
    console.error(err);
    return err;
  }
};

export const createSpot = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot)
    });

    if (res.ok) {
      const newSpot = await res.json();
      dispatch(loadNewSpot(newSpot));
      return newSpot;
    } else {
      const error = await res.json();
      console.error(error);
      return error;
    }

  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateASpot = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot)
    });

    if (res.ok) {
      const updatedSpot = await res.json();
      dispatch(updateSpot(updatedSpot));
      return updatedSpot;
    } else {
      const error = await res.json();
      console.error(error);
    }

  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      dispatch(removeSpot(spotId));
    } else {
      const error = await res.json();
      console.error(error);
    }

  } catch (err) {
    console.error(err)
    return err;
  }
};

export const createSpotImages = (image) => async (dispatch) => {
  const { spotId, url, preview } = image;
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, preview })
    });

    if (res.ok) {
      const newImage = await res.json();
      dispatch(loadSpotImages(newImage));
      return newImage;
    } else {
      const error = await res.json();
      console.error(error);
      return error;
    }

  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateSpotImages = (image) => async (dispatch) => {
  const { id, spotId, url, preview } = image;
  try {
    const res = await csrfFetch(`/api/spot-images/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spotId, url, preview })
    });

    if (res.ok) {
      const updatedImage = await res.json();
      dispatch(replaceSpotImages(updatedImage));
      return updatedImage;
    } else {
      const error = await res.json();
      console.error(error);
      return error;
    }

  } catch (err) {
    console.error(err);
    return err;
  }
};

let initialState = {};

export const spotsReducer = (state = initialState, action) => {
  switch (action.type) {

    // case LOAD_SPOTS: {
    //   const newState = { ...state };
    //   action.payload
    //     .forEach(spot => {
    //       newState[spot.id] = spot;
    //     });
    //   return newState;
    // }

    case LOAD_SPOTS: {
      return {
        ...state,
        ...action.payload.reduce((acc, spot) => {
          acc[spot.id] = spot;
          return acc;
        }, {})
      };
    }

    case LOAD_SPOT_DETAILS: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case SUBMIT_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case UPDATE_SPOT: {
      const updatedSpot = action.payload;
      const newState = { ...state };
      newState[updatedSpot.id] = {
        ...newState[updatedSpot.id],
        ...updatedSpot,
        SpotImages: updatedSpot.SpotImages
          ? [...updatedSpot.SpotImages]
          : [...newState[updatedSpot.id].SpotImages],
      };
      return newState;
    }

    case REMOVE_SPOT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    case ADD_SPOT_IMAGES: {
      const newState = { ...state };
      const { spotId, url, preview } = action.payload;
      if (spotId && newState[spotId]) {
        newState[spotId].images = [...(newState[spotId].images || []), { url, preview }];
      }
      return newState;
    }

    case UPDATE_SPOT_IMAGES: {
      const newState = { ...state };
      const { spotId, images } = action.payload;
      if (spotId && newState[spotId]) {
        newState[spotId].SpotImages = images;
      }
      return newState;
    }

    default:
      return state;
  }
};
