
const LOAD_SPOTS = "SPOTS/load_spots";

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const getAllSpots = () => async (dispatch) => {
  try {
    const response = await fetch("/api/spots");
    if (response.ok) {
      const data = await response.json();
      const spots = data.Spots;

      if (Array.isArray(spots)) {
        dispatch(loadSpots(spots));
        return spots
      }

    } else {
      const error = await response.json();
      console.log(error);
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
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    }
    default:
      return state;
  }
};
