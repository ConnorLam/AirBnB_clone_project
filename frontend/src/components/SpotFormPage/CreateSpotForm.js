import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneSpot } from "../../store/spots";
import "./CreateSpot.css";
// import "../SignupFormPage/SignupForm.css"

const CreateSpot = ({setShowModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  // console.log(user)

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (name.length < 1 || name.length > 49)
      errors.push("Name must be between 1 and 49 characters");
    if (price <= 0) errors.push("Please set a higher price");
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state");
    if (!country.length) errors.push("Please provide a country");
    if (!lat) errors.push("Please provide a lat");
    if (!lng) errors.push("Please provide a lng");
    if (!description) errors.push("Please provide a description");
    if (description.length < 10 || description.length > 500)
      errors.push("description must be between 10 and 500");
    if (previewImage.length < 1) errors.push("Please provide an image url");
    if (isImage(previewImage) === false)
      errors.push("Please provide a valid image url");

    return setValidationErrors(errors);
  }, [
    name,
    price,
    address,
    city,
    state,
    country,
    lat,
    lng,
    description,
    previewImage,
  ]);

  if (user === null) {
    alert("must be signed up to create a spot");
    return history.push(`/`);
  }

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  async function onSubmit(e) {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert("must fix your errors");

    const details = {
      name,
      price,
      address,
      city,
      state,
      country,
      lng,
      lat,
      description,
      previewImage,
    };

    
    const spot = await dispatch(createOneSpot(details));
    
    

    if (spot) {
      history.push(`/spots/${spot.id}`);
      setShowModal(false)
    }
  }

  // useEffect(() => {
  //     dispatch(createOneSpot())
  // })

  return (
    <>
        <div className="signup">
            <h3>Host a Spot!</h3>
        </div>
        <div className="create-spot-form signup-form-modal overflow-container">
            <div className="welcome-signup">
                <h2 className="welcome-header">Start your hosting journey here</h2>
            </div>
        <form onSubmit={onSubmit}>
            <div className="signup-info">
                <div className='input-box'>
                    <input
                        className="input"
                        placeholder="Name"
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        placeholder="Address"
                        id="address"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                        />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        placeholder="City"
                        id="city"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                        />
                </div>
                <div>
                    <input
                        className='input'
                        placeholder="State"
                        id="state"
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        placeholder="Country"
                        id="country"
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required
                        />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        placeholder="Latitude"
                        id="lat"
                        type="number"
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                        required
                        />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        placeholder="Longitude"
                        id="lng"
                        type="number"
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                        required
                        />
                </div>
                <div className="input-box">
                    <textarea
                        className='input'
                        placeholder="Description"
                        id="description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        placeholder="Price"
                        id="price"
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                        />
                </div>
                <div className="input-box">
                    <input
                        className='input'
                        id="previewImage"
                        placeholder="Preview Image: Enter a valid image url"
                        type="url"
                        onChange={(e) => setPreviewImage(e.target.value)}
                        value={previewImage}
                        />
                </div>
            </div>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                    Please check your form for errors
                    <ul>
                        {validationErrors.map((validationError) => (
                        <li key={validationError}>{validationError}</li>
                        ))}
                    </ul>
                    </div>
                )}
            <div className="signup-button-div">
                <button className="signup-button" type="submit">Submit</button>

            </div>
        </form>
        </div>
    </>
  );
};

export default CreateSpot;
