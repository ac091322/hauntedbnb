import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createSpot, createSpotImages } from "../../store/spots";
import "./CreateSpot.css";


const SpotForm = () => {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validations, setValidations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    country: "",
    address: "",
    city: "",
    state: "",
    longitude: "",
    latitude: "",
    description: "",
    spotName: "",
    price: "",
    primaryURL: "https://picsum.photos/300/300?random=1",
    imageURL1: "https://picsum.photos/300/300?random=2",
    imageURL2: "https://picsum.photos/300/300?random=3",
    imageURL3: "https://picsum.photos/300/300?random=4",
    imageURL4: "https://picsum.photos/300/300?random=5"
  });

  const country = searchParams.get("country") || "";
  const address = searchParams.get("address") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const longitude = searchParams.get("longitude") || "";
  const latitude = searchParams.get("latitude") || "";
  const description = searchParams.get("description") || "";
  const spotName = searchParams.get("spotName") || "";
  const price = searchParams.get("price") || "";
  const primaryURL = searchParams.get("primaryURL") || "https://picsum.photos/300/300?random=1";
  const imageURL1 = searchParams.get("imageURL1") || "https://picsum.photos/300/300?random=2";
  const imageURL2 = searchParams.get("imageURL2") || "https://picsum.photos/300/300?random=3";
  const imageURL3 = searchParams.get("imageURL3") || "https://picsum.photos/300/300?random=4";
  const imageURL4 = searchParams.get("imageURL4") || "https://picsum.photos/300/300?random=5";

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      Object.keys(storedFormData).forEach(key => {
        setSearchParams(prev => {
          prev.set(key, storedFormData[key]);
          return prev;
        }, { replace: true });
      });
    }
  }, [setSearchParams]);

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
      if (!state || state.length !== 2 || !/^[a-zA-Z]+$/.test(state)) formErrors.state = "State must be 2 letters";
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

  const handleChange = (key, value) => {
    setSearchParams(prev => {
      prev.set(key, value);
      return prev;
    }, { replace: true });
    const formData = {
      country, address, city, state, longitude, latitude, description, spotName, price, primaryURL, imageURL1, imageURL2, imageURL3, imageURL4
    };
    formData[key] = value;
    localStorage.setItem('formData', JSON.stringify(formData));
  };

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

      localStorage.removeItem('formData');
      setSearchParams({
        country: "",
        address: "",
        city: "",
        state: "",
        longitude: "",
        latitude: "",
        description: "",
        spotName: "",
        price: "",
        primaryURL: "https://picsum.photos/300/300?random=1",
        imageURL1: "https://picsum.photos/300/300?random=2",
        imageURL2: "https://picsum.photos/300/300?random=3",
        imageURL3: "https://picsum.photos/300/300?random=4",
        imageURL4: "https://picsum.photos/300/300?random=5"
      }, { replace: true });

      navigate(`/spots/${createdSpot.id}`, { replace: true });
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     FormData.append("file", file)
  //     dispatch(uploadImage(formData));
  //   }
  // };

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
                onChange={e => handleChange("country", e.target.value)}
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
                onChange={e => handleChange("address", e.target.value)}
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
                  onChange={e => handleChange("city", e.target.value)}
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
                  onChange={e => handleChange("state", e.target.value)}
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
                  onChange={e => handleChange("longitude", e.target.value)}
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
                  onChange={e => handleChange("latitude", e.target.value)}
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
            onChange={e => handleChange("description", e.target.value)}
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
            onChange={e => handleChange("spotName", e.target.value)}
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
              onChange={e => handleChange("price", e.target.value)}
            />
          </div>
          {submitted && validations.price && <span className="form-error-text">{validations.price}</span>}
        </div>

        <hr />

        <div className="section-container-create-spot">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot. For best results, images should be squares, for example 300px by 300px. You can choose to use the preset URLs below, or your own.</p>
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
                onChange={e => handleChange("primaryURL", e.target.value)}
              />
              {submitted && validations.primaryURL && <span className="form-error-text">{validations.primaryURL}</span>}
            </div>

            <input
              value={imageURL1}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => handleChange("imageURL1", e.target.value)}
            />
            <input
              value={imageURL2}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => handleChange("imageURL2", e.target.value)}
            />
            <input
              value={imageURL3}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => handleChange("imageURL3", e.target.value)}
            />
            <input
              value={imageURL4}
              type="text"
              name="url"
              placeholder=" Image URL"
              className="optional-url-field"
              onChange={e => handleChange("imageURL4", e.target.value)}
            />
          </div>
        </div>

        <hr />

        {/* <input
          className="upload-local-image-container"
          type="file"
          accept="image/*"
          placeholder="Upload local image"
        // onChange={handleFileChange}
        />

        <hr /> */}

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
