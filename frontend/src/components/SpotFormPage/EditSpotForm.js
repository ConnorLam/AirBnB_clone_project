import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editASpot } from "../../store/spots";
import './EditSpotForm.css'



const EditSpot = ({spot}) => {
    // console.log('!!!!!!!!!!!!!!!!!!!!', spot)
  const dispatch = useDispatch();
  const history = useHistory();
//   const spotId = spot.id
// console.log(spot)
//   const {spotId} = useParams()
  // const parsedSpotId = Number(spotId)
  // console.log(parsedSpotId)
  // const spot = useSelector((state) => state.spots)
  // console.log(spot.)
//   console.log(spotId)

  const user = useSelector((state) => state.session.user);
//   const spot = useSelector((state) => state.spots)
  // console.log(user)
  // if(spot) console.log(spot[spotId].id)
  // const spotId = spot.id
  // console.log(spotId)
//   useEffect(() => {
//     dispatch(getSpotById(s))
//   }, [dispatch, spotId])
  
  
  // spot[spotId].address;
  
  const [address, setAddress] = useState(spot?.address || '');
  const [city, setCity] = useState(spot?.city || '');
  const [state, setState] = useState(spot?.state || '');
  const [country, setCountry] = useState(spot?.country || '');
  const [lat, setLat] = useState(spot?.lat || '');
  const [lng, setLng] = useState(spot?.lng || '');
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description || '');
  const [price, setPrice] = useState(spot?.price || '');
  const [validationErrors, setValidationErrors] = useState(spot?.validationError || '');
//   const [previewImage, setPreviewImage] = useState(spot.previewImage || '')
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
    
    return setValidationErrors(errors);
  }, [name, price, address, city, state, country, lat, lng, description]);
  
  if (user === null) {
    alert("must be signed up to edit a spot");
    return history.push(`/`);
  }
  
  if(!spot) return null
  //   if (!spot || spot === {}) return null;
  
  async function onSubmit(e) {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert("must fix your errors");

    const details = {
        id: spot.id,
      name,
      price,
      address,
      city,
      state,
      country,
      lng,
      lat,
      description,
    };

    const editedSpot = await dispatch(editASpot(details));
    // await dispatch(getSpotById(spotId))

    if (editedSpot) {
      history.push(`/spots/${spot.id}`);
    }
  }

  // useEffect(() => {
  //     dispatch(createOneSpot())
  // })

  return (
    <>
      <div className="signup">
        <h3>Edit Spot</h3>
      </div>
      <div className="signup-form-modal overflow-container">
        <div className="welcome-signup">
          <h2 className="welcome-header">Details</h2>
        </div>
        <form onSubmit={onSubmit}>
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
          <div className="signup-info edit-spot-info">
            <div className="input-box name-input-box">
              <label className='name-label' htmlFor="name">Name</label>
              <input
                className="input"
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                className="input"
                id="address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                className="input"
                id="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                className="input"
                id="state"
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                className="input"
                id="country"
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </div>
            <div>
              <label htmlFor="lat">Latitude</label>
              <input
                className="input"
                id="lat"
                type="number"
                onChange={(e) => setLat(e.target.value)}
                value={lat}
              />
            </div>
            <div>
              <label htmlFor="lng">Longitude</label>
              <input
                className="input"
                id="lng"
                type="number"
                onChange={(e) => setLng(e.target.value)}
                value={lng}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="input"
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                className="input"
                id="price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
          {/* <div>
                    <label htmlFor="previewImage">Preview Image</label>
                    <input
                        id="previewImage"
                        type='url'
                        onChange={(e) => setPreviewImage(e.target.value)}
                        value={previewImage}
                    />
                </div> */}
                <div className="signup-button-div">
                  <button className="signup-button" type="submit">Submit</button>
                </div>
        </form>
      </div>
    </>
  );
};


export default EditSpot