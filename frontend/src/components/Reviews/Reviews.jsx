import { useSelector } from "react-redux";
import { TbDropletFilled } from "react-icons/tb";
import "./Reviews.css";

const Reviews = ({ review }) => {
  const newUpdatedDate = new Date(review.updatedAt);
  const currentUser = useSelector((state) => state.session.user);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = newUpdatedDate.getDate();
  const monthIndex = newUpdatedDate.getMonth();
  const year = newUpdatedDate.getFullYear();

  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  let firstName = "";
  if (review.User && review.User.firstName) {
    firstName = review.User.firstName;
  } else if (currentUser) {
    firstName = currentUser.firstName;
  }

  return (
    <div id="review-container">
      <div id="name-rating-container">
        <h3 id="review-name">{firstName}</h3>

        <div id="rating-star-container">
          <span>{review.stars}</span>
          <TbDropletFilled className="blood-icon" />
        </div>
      </div>
      <span id="review-date">{formattedDate}</span>
      <span>{review.review}</span>
    </div>
  );
};

export default Reviews;
