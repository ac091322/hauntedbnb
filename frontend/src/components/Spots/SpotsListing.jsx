import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { getAllSpots } from "../../store/spots";
import Loader from "../Loader/Loader";
import "./SpotsListing.css"


const SpotsListing = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj)//.sort((a, b) => (b.id) - (a.id));

  const [toolTip, setToolTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllSpots())
      .then(() => setLoading(false));
  }, [dispatch]);

  return loading ? <Loader /> : (
    <div id="all-spots-container">
      {spots.map(spot => {
        const priceWithComma = new Intl.NumberFormat().format(spot.price);

        return (
          <div
            value={toolTip}
            key={spot.id}
            onMouseOut={() => setToolTip(null)}
            onMouseOver={() => setToolTip(spot.id)}
          >
            <Link to={`/spots/${spot.id}`} id="spot-link">
              <img
                id="spot-image"
                src={spot.SpotImages && spot.SpotImages?.find(image => image.preview)?.url}
                alt="spot-image"
              />
              <div
                id="spot-content-container">
                <div id="spot-left-content-container">
                  <span>{spot.city}, {spot.state}</span>
                  <span>${priceWithComma} night</span>
                </div>

                <div id="spot-right-content-container"
                >
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
            {toolTip === spot.id && <span id="tooltip">{spot.name}</span>}
          </div >
        )

      })}
    </div >
  );
}


export default SpotsListing;
