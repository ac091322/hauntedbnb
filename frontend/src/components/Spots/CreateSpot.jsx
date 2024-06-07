import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spots";
import "./CreateSpot.css";


const SpotForm = ({ spotData }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [spotName, setSpotName] = useState("");
  const [price, setPrice] = useState("");
  const [primaryURL, setPrimaryURL] = useState("");
  // const [imageURL1, setImageURL1] = useState("");
  // const [imageURL2, setImageURL2] = useState("");
  // const [imageURL3, setImageURL3] = useState("");
  // const [imageURL4, setImageURL4] = useState("");
  const [validations, setValidations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let formErrors = {};
    if (submitted) {
      if (!country) formErrors.country = "Country is required";
      if (!address) formErrors.address = "Address is required";
      if (!city) formErrors.city = "City is required";
      if (typeof state !== "string" || state.length !== 2) formErrors.state = "State must be 2 letters";
      if (description.length < 30) formErrors.description = "Description must be 30 characters or more";
      if (!spotName) formErrors.spotName = "Spot name is required";
      if (!price || !Number.isInteger(Number(price))) formErrors.price = "Price must be an integer";
      if (!primaryURL) formErrors.primaryURL = "Primary URL is required";
      setValidations(formErrors);
    }
  }, [country, address, city, state, description, spotName, price, primaryURL, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !country ||
      !address ||
      !city ||
      typeof state !== "string" ||
      state.length !== 2 ||
      description.length < 30 ||
      !spotName ||
      !price ||
      !Number.isInteger(Number(price)) ||
      !primaryURL
    ) {
      return;
    }

    const newSpot = {
      ownerId: currentUser.id,
      address: address,
      city: city,
      state: state.toUpperCase(),
      country: country,
      name: spotName,
      description: description,
      price: Number(price),
      previewImage: primaryURL
    };

    dispatch(createSpot(newSpot))
      .then((newSpot) => navigate(`/spots/${newSpot.id}`));
  }

  return (
    <div id="form-container">
      <h1>Create a New Spot</h1>

      <form id="create-spot-form" onSubmit={handleSubmit}>

        <div id="location-container">
          <h3>Where's your place located?</h3>
          <p>Guests will get your exact location once they've booked a reservation.</p>

          <div id="location-fields-container">
            <div className="input-field-container">
              {submitted && validations.country && <span className="create-spot-errors">{validations.country}</span>}
              <label htmlFor="country">Country</label>
              <input
                value={country}
                type="text"
                id="country"
                className="input-field-create-spot"
                name="country"
                placeholder=" Country"
                onChange={e => setCountry(e.target.value)}
              />
            </div>

            <div className="input-field-container">
              {submitted && validations.address && <span className="create-spot-errors">{validations.address}</span>}
              <label htmlFor="street-address">Street address</label>
              <input
                value={address}
                type="text"
                id="street-address"
                className="input-field-create-spot"
                name="street-address"
                placeholder=" Street address"
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <div id="city-state-container" className="input-field-container">
              <div id="city-container">
                {submitted && validations.city && <span className="create-spot-errors">{validations.city}</span>}
                <label htmlFor="city">City</label>
                <input
                  value={city}
                  type="text"
                  id="city"
                  className="input-field-create-spot"
                  name="city"
                  placeholder=" City"
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <span>,</span>
              <div id="state-container">
                {submitted && validations.state && <span className="create-spot-errors">{validations.state}</span>}
                <label htmlFor="state">State</label>
                <input
                  value={state}
                  type="text"
                  id="state"
                  className="input-field-create-spot"
                  name="state"
                  placeholder=" State"
                  onChange={e => setState(e.target.value)}
                />
              </div>
            </div>

            {/* <div id="long-lat-container" className="input-field-container">
              <div id="longitude-container">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="text"
                  id="longitude"
                  className="input-field-create-spot"
                  name="longitude"
                  placeholder=" Leave blank for now"
                />
              </div>
              <span>,</span>
              <div id="latitude-container">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  id="latitude"
                  className="input-field-create-spot"
                  name="latitude"
                  placeholder=" Leave blank for now" />
              </div>
            </div> */}

          </div>
        </div>

        <hr />

        <div className="input-field-container">
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            value={description}
            id="text-area-create-spot"
            placeholder=" Please write at least 30 characters"
            onChange={e => setDescription(e.target.value)}
          />
          {submitted && validations.description && <span className="create-spot-errors">{validations.description}</span>}
        </div>

        <hr />

        <div className="input-field-container">
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            value={spotName}
            type="text" id="spot-name"
            className="input-field-create-spot"
            name="spot-name"
            placeholder=" Name your spot"
            onChange={e => setSpotName(e.target.value)}
          />
          {submitted && validations.spotName && <span className="create-spot-errors">{validations.spotName}</span>}
          <hr />
        </div>

        <div className="input-field-container">
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher
            in search results.</p>
          <div id="price-container-create-spot" >
            <label htmlFor="price">$</label>
            <input
              value={price}
              type="text"
              id="price"
              className="input-field-create-spot"
              name="state"
              placeholder=" Price per night (USD)"
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          {submitted && validations.price && <span className="create-spot-errors">{validations.price}</span>}
        </div>

        <hr />

        <div className="input-field-container">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <div id="url-container">
            <input
              value={primaryURL}
              type="text"
              className="input-field-create-spot"
              name="url"
              placeholder=" Preview image URL"
              onChange={e => setPrimaryURL(e.target.value)}
            />
            {submitted && validations.primaryURL && <span className="create-spot-errors">{validations.primaryURL}</span>}
            {/* <input
              // value={imageURL1}
              type="text"
              className="input-field-create-spot"
              name="url"
              placeholder=" Image URL" />
            <input
              // value={imageURL2}
              type="text"
              className="input-field-create-spot"
              name="url"
              placeholder=" Image URL" />
            <input
              // value={imageURL3}
              type="text"
              className="input-field-create-spot"
              name="url"
              placeholder=" Image URL" />
            <input
              // value={imageURL4}
              type="text"
              className="input-field-create-spot"
              name="url"
              placeholder=" Image URL" /> */}
          </div>
          <hr />
        </div>

        <button
          type="submit"
          id="submit-create-spot-form">Create Spot</button>
      </form >
    </div >
  );
}


export default SpotForm;
