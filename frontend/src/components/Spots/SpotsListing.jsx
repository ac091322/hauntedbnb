import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import { getAllSpots } from "../../store/spots";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./SpotsListing.css"


const loadingTime = 500;

const SpotsListing = () => {
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj)//.sort((a, b) => (b.id) - (a.id));
  const dispatch = useDispatch();

  const [toolTip, setToolTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;
    dispatch(getAllSpots())
      .then(() => {
        timer = setTimeout(() => setLoading(false), loadingTime);
      });

    return () => clearTimeout(timer);
  }, [dispatch]);


  if (loading) {
    return (
      <div id="all-spots-container">
        {Array(20).fill().map((_, index) => (
          <div key={index} className="spot-skeleton">
            <Skeleton height="100%" borderRadius={8} style={{ aspectRatio: '1 / 1' }} />
            <div className="spot-skeleton-content">
              <div className="spot-skeleton-left">
                <Skeleton width={150} />
                <Skeleton width={100} />
              </div>
              <span className="spot-skeleton-rating">
                <Skeleton width={60} height={20} />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
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

            {toolTip === spot.id && <span id="tooltip">{spot.name}</span>}
          </div >
        )

      })}
    </div >
  );
}


export default SpotsListing;
