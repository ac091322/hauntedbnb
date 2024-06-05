import { FaStar } from "react-icons/fa";
import "./Reviews.css";


const Reviews = ({ review }) => {

  const newUpdatedDate = new Date(review.updatedAt);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = newUpdatedDate.getDate();
  const monthIndex = newUpdatedDate.getMonth();
  const year = newUpdatedDate.getFullYear();

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  return (
    <div id="review-container">
      <div id="name-rating-container">
        <h3 id="review-name">{review.User.firstName}</h3>

        <div id="rating-star-container">
          <span>{review.stars}</span>
          <FaStar id="star-icon" />
        </div>

      </div>
      <span id="review-date">{formattedDate}</span>
      <span>{review.review}</span>
    </div>
  );
};


export default Reviews;
