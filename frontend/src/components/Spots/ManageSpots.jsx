import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, deleteSpot } from "../../store/spots";
import Loader from "../Loader/Loader";
import { TbDropletFilled } from "react-icons/tb";
import { FaArrowCircleRight } from "react-icons/fa";
import "./ManageSpots.css";


const ManageSpots = () => {
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [spotToDelete, setSpotToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllSpots())
      .then(() => setLoading(false));
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

  return loading ? <Loader /> : (
    <div id="page-container-manage-spots">
      <h1>Manage Spots</h1>

      {filteredSpots.length === 0 &&
        <div id="create-new-spot-container">
          <p>You haven&apos;t created any spots yet, let&apos;s start by creating a spot using the button below.</p>
          <button
            type="button"
            onClick={() => navigate("/spots/create")}
          >
            Create a New Spot <FaArrowCircleRight />
          </button>
        </div>
      }

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
                  type="button"
                  className="manage-spots-buttons"
                  onClick={() => openDeletePopup(spot.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="manage-spots-buttons"
                  onClick={() => navigate(`/spots/${spot.id}/edit`)}
                >
                  Update
                </button>
              </div>

              {spotToDelete === spot.id && (
                <div
                  className="popup-container-delete-spot"
                  onClick={closeDeletePopup}
                >
                  <div
                    id="delete-spot-popup-background"
                    onClick={e => e.stopPropagation()}
                  >
                    <h1>Delete</h1>
                    <p>Are you sure you want to delete this spot?</p>
                    <div id="delete-popup-buttons-container">
                      <button
                        type="button"
                        id="delete-spot-button-no"
                        className="delete-spot-popup-buttons"
                        onClick={closeDeletePopup}
                      >
                        No, Keep
                      </button>
                      <button
                        type="submit"
                        id="delete-spot-button-yes"
                        className="delete-spot-popup-buttons"
                        onClick={() => handleDelete(spot.id)}
                      >
                        Yes... Delete
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
}


export default ManageSpots;
