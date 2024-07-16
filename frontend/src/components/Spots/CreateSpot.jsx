import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createSpot, createSpotImages } from "../../store/spots";
import "./CreateSpot.css";


const SpotForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [description, setDescription] = useState("");
  const [spotName, setSpotName] = useState("");
  const [price, setPrice] = useState("");
  const [primaryURL, setPrimaryURL] = useState("");
  const [imageURL1, setImageURL1] = useState("");
  const [imageURL2, setImageURL2] = useState("");
  const [imageURL3, setImageURL3] = useState("");
  const [imageURL4, setImageURL4] = useState("");
  const [validations, setValidations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let formErrors = {};
    if (submitted) {
      if (!country) formErrors.country = "Country is required";
      if (!address) formErrors.address = "Address is required";
      if (!city) formErrors.city = "City is required";
      if (city) {
        if (city.length > 25) {
          formErrors.city = "City name is too long";
        }
      }
      if (typeof state !== "string" || state.length !== 2 || !/^[a-zA-Z]+$/.test(state)) formErrors.state = "State must be 2 letters";
      if (!longitude) formErrors.longitude = "Longitude is required"
      if (longitude) {
        if (isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
          formErrors.longitude = "Must be between 180 and -180";
        } else if (Number(longitude).toFixed(4) !== Number(longitude).toString()) {
          formErrors.longitude = "Must have 4 decimal places";
        }
      }
      if (!latitude) formErrors.latitude = "Latitude is required";
      if (latitude) {
        if (isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90) {
          formErrors.latitude = "Must be between 90 and -90";
        } else if (Number(latitude).toFixed(4) !== Number(latitude).toString()) {
          formErrors.latitude = "Must have 4 decimal places";
        }
      }
      if (description.length < 30) formErrors.description = "Description is too short";
      if (!spotName) formErrors.spotName = "Spot name is required";
      if (spotName) {
        if (spotName.length > 50) {
          formErrors.spotName = "Spot name is too long";
        }
      }
      if (price === "" || !Number.isInteger(Number(price))) formErrors.price = "Price must be a number between 0 and 9,999";
      if (!primaryURL) formErrors.primaryURL = "Primary URL is required";
      setValidations(formErrors);
    }
  }, [country, address, city, state, longitude, latitude, description, spotName, price, primaryURL, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.values(validations).length === 0) {
      const requiredFields = [country, address, city, state, longitude, latitude, description, spotName, price, primaryURL];
      if (requiredFields.some(field => field === "" || field === undefined || field === null)) {
        return;
      }

      const createdSpotBody = {
        ownerId: Number(currentUser.id),
        address: address,
        city: city,
        state: state.toUpperCase(),
        country: country,
        lng: Number(longitude),
        lat: Number(latitude),
        name: spotName,
        description: description,
        price: Number(price)
      };

      const createdSpot = await dispatch(createSpot(createdSpotBody));
      const imagePayloads = [
        { spotId: Number(createdSpot.id), url: primaryURL, preview: true },
        ...(imageURL1 ? [{ spotId: Number(createdSpot.id), url: imageURL1, preview: false }] : []),
        ...(imageURL2 ? [{ spotId: Number(createdSpot.id), url: imageURL2, preview: false }] : []),
        ...(imageURL3 ? [{ spotId: Number(createdSpot.id), url: imageURL3, preview: false }] : []),
        ...(imageURL4 ? [{ spotId: Number(createdSpot.id), url: imageURL4, preview: false }] : [])
      ];

      await Promise.all(imagePayloads.map((imagePayload) =>
        dispatch(createSpotImages(imagePayload))));

      navigate(`/spots/${createdSpot.id}`, { replace: true });
    }
  };

  return (
    <div id="form-container-create-spot">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>

        <div className="section-container-create-spot">
          <h3>Where&apos;s your place located?</h3>
          <p>Guests will get your exact location once they&apos;ve booked a reservation.</p>
          <div id="location-fields-container-create-spot">

            <div id="country-address-container">
              <div className="left-right-container">
                <label htmlFor="country">Country</label>
                {submitted && validations.country && <span className="form-error-text">{validations.country}</span>}
              </div>
              <input
                value={country}
                type="text"
                id="country"
                name="country"
                placeholder=" Country"
                onChange={e => setCountry(e.target.value)}
              />
            </div>

            <div id="country-address-container">
              <div className="left-right-container">
                <label htmlFor="street-address">Street address</label>
                {submitted && validations.address && <span className="form-error-text">{validations.address}</span>}
              </div>
              <input
                value={address}
                type="text"
                id="street-address"
                name="street-address"
                placeholder=" Street address"
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <div id="city-state-container">
              <div id="city-container">
                <div className="left-right-container">
                  <label htmlFor="city">City</label>
                  {submitted && validations.city && <span className="form-error-text">{validations.city}</span>}
                </div>
                <input
                  value={city}
                  type="text"
                  id="city"
                  name="city"
                  placeholder=" City"
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <span className="comma">,</span>
              <div id="state-container">
                <div className="left-right-container">
                  <label htmlFor="state">State</label>
                  {submitted && validations.state && <span className="form-error-text">{validations.state}</span>}
                </div>
                <input
                  value={state}
                  type="text"
                  id="state"
                  name="state"
                  placeholder=" State"
                  onChange={e => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="lng-lat-container">
              <div className="lng-lat-subcontainer">
                <div className="left-right-container">
                  <label htmlFor="city">Longitude</label>
                  {submitted && validations.longitude && <span className="form-error-text">{validations.longitude}</span>}
                </div>
                <input
                  value={longitude}
                  type="number" min="-180" max="180" step="0.0001"
                  className="lng-lat"
                  name="lng"
                  placeholder=" Longitude"
                  onChange={e => setLongitude(e.target.value)}
                />
              </div>
              <span className="comma">,</span>
              <div className="lng-lat-subcontainer">
                <div className="left-right-container">
                  <label htmlFor="state">Latitude</label>
                  {submitted && validations.latitude && <span className="form-error-text">{validations.latitude}</span>}
                </div>
                <input
                  value={latitude}
                  type="number" min="-90" max="90" step="0.0001"
                  className="lng-lat"
                  name="lat"
                  placeholder=" Latitude"
                  onChange={e => setLatitude(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        <hr />

        <div className="section-container-create-spot">
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            value={description}
            id="description-create-spot"
            placeholder=" Please write at least 30 characters"
            onChange={e => setDescription(e.target.value)}
          />
          {submitted && validations.description && <span className="form-error-text">{validations.description}</span>}
        </div>

        <hr />

        <div className="section-container-create-spot">
          <h3>Create a title for your spot</h3>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            value={spotName}
            type="text"
            className="input-field-create-spot"
            name="name"
            placeholder=" Name your spot"
            onChange={e => setSpotName(e.target.value)}
          />
          {submitted && validations.spotName && <span className="form-error-text">{validations.spotName}</span>}
          <hr />
        </div>

        <div className="section-container-create-spot">
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher
            in search results.</p>
          <div id="price-container-create-spot" >
            <label htmlFor="price">$</label>
            <input
              value={price}
              type="number"
              min="0"
              max="9999"
              id="price"
              className="input-field-create-spot"
              name="price"
              placeholder=" Price per night (USD)"
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          {submitted && validations.price && <span className="form-error-text">{validations.price}</span>}
        </div>

        <hr />

        <div className="section-container-create-spot">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot. For best results, images should be squares, for example 300px by 300px.</p>
          <p className="form-error-text">Can copy and paste the following link: https://picsum.photos/300/300?random=1</p>
          <div id="image-url-container">
            <div
              className="error-group"
            >
              <input
                value={primaryURL}
                type="text"
                className="url-field-create-spot"
                name="url"
                placeholder=" Preview image URL"
                id="primary-url-field"
                onChange={e => setPrimaryURL(e.target.value)}
              />
              {submitted && validations.primaryURL && <span className="form-error-text">{validations.primaryURL}</span>}
            </div>

            <input
              value={imageURL1}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => setImageURL1(e.target.value)}
            />
            <input
              value={imageURL2}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => setImageURL2(e.target.value)}
            />
            <input
              value={imageURL3}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => setImageURL3(e.target.value)}
            />
            <input
              value={imageURL4}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => setImageURL4(e.target.value)} />
          </div>
        </div>

        <hr />

        <button
          type="submit"
          className="create-update-spot-buttons"
        >Create Spot
        </button>

        <button
          type="button"
          className="create-update-spot-buttons"
          onClick={() => navigate(-1)}
        >Nevermind, Go Back
        </button>

      </form >
    </div >
  );
}


export default SpotForm;
