import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "SPOTS/load_spots";
const LOAD_SPOT_DETAILS = "SPOTS/load_spot_detail";
const CREATE_SPOT = "SPOTS/create_spot";
const CREATE_SPOT_IMAGE = "SPOTS/create_spot_image"

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

export const loadSpotDetails = (spot) => {
  return {
    type: LOAD_SPOT_DETAILS,
    spot
  }
};

export const loadNewSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot
  }
};

export const loadSpotImage = (spotImage) => {
  return {
    type: CREATE_SPOT_IMAGE,
    payload: spotImage
  }
};

export const getAllSpots = () => async (dispatch) => {
  try {
    const res = await fetch("/api/spots", {
      method: "GET"
    });

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
    const res = await fetch(`/api/spots/${spotId}`, {
      method: "GET"
    });

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

export const createSpot = (spotImage) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(spotImage)
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

export const createSpotImage = (imagePayload) => async (dispatch) => {
  const { spotId, url, preview } = imagePayload;

  try {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, preview })
    });

    if (res.ok) {
      const newImage = await res.json();
      dispatch(loadSpotImage(newImage));
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

let initialState = {};

export const spotsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_SPOTS: {
      const spotsState = { ...state };
      action.spots
        .forEach(spot => {
          spotsState[spot.id] = spot;
        });
      return spotsState;
    }

    case LOAD_SPOT_DETAILS: {
      const spotDetailsState = { ...state };
      spotDetailsState[action.spot.id] = action.spot;
      return spotDetailsState;
    }

    case CREATE_SPOT: {
      const spotState = { ...state };
      spotState[action.payload.id] = action.payload;
      return spotState;
    }

    case CREATE_SPOT_IMAGE: {
      const imageState = { ...state };
      const { spotId, url, preview } = action.payload;
      if (spotId && imageState[spotId]) {
        imageState[spotId].images = [...(imageState[spotId].images || []), { url, preview }];
      }
      return imageState;
    }

    default:
      return state;
  }
};
