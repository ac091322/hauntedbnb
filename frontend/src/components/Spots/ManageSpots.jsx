import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { TbDropletFilled } from "react-icons/tb";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const filteredSpots = useMemo(() => {
    if (currentUser) {
      return spots.filter(spot => spot.ownerId === currentUser.id);
    }
    return [];
  }, [currentUser, spots]);

  return (
    <div id="page-container-manage-spots">
      <h1>Manage Spots</h1>
      <div id="all-spots-container">
        {filteredSpots.map(spot => {
          const priceWithComma = new Intl.NumberFormat().format(spot.price);

          return (
            <div
              key={spot.id}
            >
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
            </div>
          )

        })}
      </div>
    </div>
  );
}


export default ManageSpots;
