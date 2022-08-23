import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneSpot } from "../../store/spots";


const CreateSpot = () => {

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)

    return (
        <div>
            <h2>Host A Spot!</h2>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input
                        id="state"
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    />
                </div>
                <div>
                    <label htmlFor="lat">Latitude</label>
                    <input
                        id="lat"
                        type='number'
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                    />
                </div>
                <div>
                    <label htmlFor="lng">Longitude</label>
                    <input
                        id="lng"
                        type='number'
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}


export default CreateSpot