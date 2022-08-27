import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneSpot } from "../../store/spots";


const CreateSpot = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    
    const user = useSelector(state => state.session.user)
    // console.log(user)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
      const errors = [];

      if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
      if (price <= 0) errors.push("Please set a higher price");
      if (!address.length) errors.push("Please provide an address");
      if (!city.length) errors.push("Please provide a city");
      if (!state.length) errors.push("Please provide a state")
      if (!country.length) errors.push("Please provide a country")
      if (!lat) errors.push("Please provide a lat")
      if (!lng) errors.push("Please provide a lng")
      if (!description) errors.push("Please provide a description")
      if (description.length < 10 || description.length > 500) errors.push("description must be between 10 and 500")
      if (previewImage.length < 1) errors.push("Please provide a valid image url")
      


      return setValidationErrors(errors);

  }, [name, price, address, city, state, country,lat, lng, description, previewImage])

  if(user === null) {
    alert('must be signed up to create a spot')
    return history.push(`/`)
  }

  async function onSubmit(e){
    e.preventDefault();

    setHasSubmitted(true);
    if(validationErrors.length) return alert('must fix your errors')


    const details = { name, price, address, city, state, country, lng, lat, description, previewImage }

    const spot = await dispatch(createOneSpot(details))


    if(spot){
        history.push(`/spots/${spot.id}`)
    }


}

    // useEffect(() => {
    //     dispatch(createOneSpot())
    // })

    return (
        <div>
            <h2>Host A Spot!</h2>
            <form
            onSubmit={onSubmit}
            >
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        Please check your form for errors
                        <ul>
                            {validationErrors.map((validationError => (
                                <li key={validationError}>{validationError}</li>
                            )))}
                        </ul>
                    </div>
                )}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input
                        id="state"
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lat">Latitude</label>
                    <input
                        id="lat"
                        type='number'
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lng">Longitude</label>
                    <input
                        id="lng"
                        type='number'
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="previewImage">Preview Image</label>
                    <input
                        id="previewImage"
                        placeholder="Enter a valid image url"
                        type='url'
                        onChange={(e) => setPreviewImage(e.target.value)}
                        value={previewImage}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default CreateSpot