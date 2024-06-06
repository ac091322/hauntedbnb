import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "SPOTS/load_spots";
const LOAD_SPOT_DETAILS = "SPOTS/load_spot_detail";
const CREATE_SPOT = "SPOTS/create_spot";

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
    spot
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
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const createSpot = (spotData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(spotData)
    });

    if (res.ok) {
      const spot = await res.json();
      dispatch(loadNewSpot(spot));
      return spot;

    } else {
      const error = await res.json();
      console.error(error)
    }
  } catch (err) {
    console.error(err);
  }
}

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
      return spotState
    }

    default:
      return state;
  }
};
