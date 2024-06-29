import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, deleteSpot } from "../../store/spots";
import { TbDropletFilled } from "react-icons/tb";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const currentUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const filteredSpots = useMemo(() => {
    if (currentUser) {
      return spots.filter(spot => spot.ownerId === currentUser.id);
    }
    return [];
  }, [currentUser, spots]);

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
    setSpotToDelete(null);
  };

  const openDeletePopup = (spotId) => {
    setSpotToDelete(spotId);
  };

  const closeDeletePopup = () => {
    setSpotToDelete(null);
  };

  return (
    <div id="page-container-manage-spots">
      <h1>Manage Spots</h1>

      <button
        id="create-spot-button-manage-spots"
        onClick={() => navigate("/spots/create")}
      >
        Create a Spot
      </button>

      <div id="all-spots-container">
        {filteredSpots.map(spot => {
          const priceWithComma = new Intl.NumberFormat().format(spot.price);

          return (
            <div key={spot.id}>
              <Link to={`/spots/${spot.id}`} id="spot-link">
                <img
                  id="spot-image"
                  src={spot.SpotImages && spot.SpotImages.find(image => image.preview)?.url}
                  alt="spot-image"
                />
                <div id="spot-content-container">
                  <div id="spot-left-content-container">
                    <span>{spot.city}, {spot.state}</span>
                    <span>${priceWithComma} night</span>
                  </div>
                  <div id="spot-right-content-container">
                    {spot.numReviews === 0 ? (
                      <>
                        <TbDropletFilled className="blood-icon" /><span>New spot!</span>
                      </>
                    ) : (
                      <>
                        {Number.isInteger(spot.avgStarRating) ? `${spot.avgStarRating}.0` : spot.avgStarRating}
                        <TbDropletFilled className="blood-icon" />
                      </>
                    )}
                  </div>
                </div>
              </Link>

              <div id="crud-buttons-container-manage-spots">
                <button
                  className="manage-spots-buttons"
                  type="button"
                  onClick={() => openDeletePopup(spot.id)}
                >
                  Delete
                </button>
                <button className="manage-spots-buttons">Edit</button>
              </div>

              {spotToDelete === spot.id && (
                <div className="popup-container-delete-spot">
                  <div id="delete-spot-popup-background">
                    <h1>Delete</h1>
                    <p>Are you sure you want to delete this spot?</p>
                    <div id="delete-popup-buttons-container">
                      <button
                        className="delete-spot-popup-buttons"
                        onClick={closeDeletePopup}
                      >
                        No, keep
                      </button>
                      <button
                        className="delete-spot-popup-buttons"
                        onClick={() => handleDelete(spot.id)}
                      >
                        Yes, delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );

        })}
      </div>
    </div>
  );
};

export default ManageSpots;
