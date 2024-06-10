import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createSpot, createSpotImage } from "../../store/spots";
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
      if (typeof state !== "string" || state.length !== 2 || !/^[a-zA-Z]+$/.test(state)) formErrors.state = "State must be 2 letters";
      if (!longitude || !Number.isInteger(Number(longitude))) formErrors.longitude = "Longitude must be an integer"
      if (!latitude || !Number.isInteger(Number(latitude))) formErrors.latitude = "Latitude must be an integer"
      if (description.length < 30) formErrors.description = "Description must be 30 characters or more";
      if (!spotName) formErrors.spotName = "Spot name is required";
      if (!price || !Number.isInteger(Number(price))) formErrors.price = "Price must be an integer";
      if (!primaryURL) formErrors.primaryURL = "Primary URL is required";
      setValidations(formErrors);
    }
  }, [country, address, city, state, longitude, latitude, description, spotName, price, primaryURL, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !country ||
      !address ||
      !city ||
      typeof state !== "string" ||
      state.length !== 2 ||
      !longitude ||
      !Number.isFinite(Number(longitude)) ||
      !latitude ||
      !Number.isFinite(Number(latitude)) ||
      description.length < 30 ||
      !spotName ||
      !price ||
      !Number.isFinite(Number(price)) ||
      !primaryURL
    ) {
      return;
    }

    const newSpot = {
      ownerId: Number(currentUser.id),
      address: address,
      city: city,
      state: state.toUpperCase(),
      country: country,
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: spotName,
      description: description,
      price: Number(price),
      lat: latitude,
      lng: longitude
    };

    try {
      const createdSpot = await dispatch(createSpot(newSpot));

      const imagePayloads = [
        { spotId: createdSpot.id, url: primaryURL, preview: true },
        ...(imageURL1 ? [{ spotId: createdSpot.id, url: imageURL1, preview: false }] : []),
        ...(imageURL2 ? [{ spotId: createdSpot.id, url: imageURL2, preview: false }] : []),
        ...(imageURL3 ? [{ spotId: createdSpot.id, url: imageURL3, preview: false }] : []),
        ...(imageURL4 ? [{ spotId: createdSpot.id, url: imageURL4, preview: false }] : [])
      ];

      const imageCreationPromises = imagePayloads.map((imagePayload) => dispatch(createSpotImage(imagePayload)));
      await Promise.all(imageCreationPromises);
      navigate(`/spots/${createdSpot.id}`);

    } catch (err) {
      console.error("Failed to create spot or images:", err);
    }
  };

  return (
    <div id="form-container">
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
              <span>,</span>
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
                  type="text"
                  className="lng-lat"
                  name="longitude"
                  placeholder="Longitude"
                  onChange={e => setLongitude(e.target.value)}
                />
              </div>
              <span>,</span>
              <div className="lng-lat-subcontainer">
                <div className="left-right-container">
                  <label htmlFor="state">Latitude</label>
                  {submitted && validations.latitude && <span className="form-error-text">{validations.latitude}</span>}
                </div>
                <input
                  value={latitude}
                  type="text"
                  className="lng-lat"
                  name="latitude"
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
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
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
            name="spot-name"
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
              type="text"
              id="price"
              className="input-field-create-spot"
              name="state"
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
          <div id="image-urls-container-create-spot">
            <div className="error-group">
              <input
                value={primaryURL}
                type="text"
                className="url-field-create-spot"
                name="url"
                placeholder=" Preview image URL"
                onChange={e => setPrimaryURL(e.target.value)}
              />
              {submitted && validations.primaryURL && <span className="form-error-text">{validations.primaryURL}</span>}
            </div>
            <input
              value={imageURL1}
              type="text"
              className="url-field-create-spot"
              name="url"
              placeholder=" Image URL"
              onChange={e => setImageURL1(e.target.value)}
            />
            <input
              value={imageURL2}
              type="text"
              className="url-field-create-spot"
              name="url"
              placeholder=" Image URL"
              onChange={e => setImageURL2(e.target.value)}
            />
            <input
              value={imageURL3}
              type="text"
              className="url-field-create-spot"
              name="url"
              placeholder=" Image URL"
              onChange={e => setImageURL3(e.target.value)}
            />
            <input
              value={imageURL4}
              type="text"
              className="url-field-create-spot"
              name="url"
              placeholder=" Image URL"
              onChange={e => setImageURL4(e.target.value)} />
          </div>
          <hr />
        </div>

        <button
          type="submit"
          id="button-create-spot">Create Spot</button>
      </form >
    </div >
  );
}


export default SpotForm;
