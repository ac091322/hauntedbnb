const LOAD_SPOTS = "SPOTS/load_spots";
const LOAD_SPOT_DETAILS = "SPOTS/load_spot_detail";

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
}

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
      console.error(error)
    }
  } catch (err) {
    console.error(err);
    return err;
  }
}

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
      console.error(error)
    }
  } catch (err) {
    console.error(err);
    return err;
  }
}

let initialState = {};

export const spotsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_SPOTS: {
      const spotsState = { ...state };
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }

    case LOAD_SPOT_DETAILS: {
      const spotDetailsState = { ...state };
      spotDetailsState[action.spot.id] = action.spot;
      return spotDetailsState;
    }

    default:
      return state;
  }
};
