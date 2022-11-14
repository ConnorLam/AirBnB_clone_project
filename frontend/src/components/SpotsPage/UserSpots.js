import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from "react-router-dom"; 
import { getUserSpots } from "../../store/spots";
import { deleteASpot } from "../../store/spots";
import EditSpotModal from "../SpotFormPage/IndexEditSpot";
import './UserSpots.css'


const UserSpots = () => {

    const history = useHistory()
    // const [state, setState] = useState(false) 

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)

    if(!user){
        alert('must be logged in to access')
        history.push('/')
    }
    
    useEffect(() => {
            dispatch(getUserSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch, user])
    
    let spots = useSelector(state => state.spots)
    // if(!spots) return <div>You have no spots yet</div>

    if(!spots) return null

    let spotsArr = Object.values(spots)

    if(spotsArr.length === 0){
        return <h2>No spots available</h2>
    }

    function validImage(spot) {
      if (spot.previewImage) {
        return spot.previewImage;
      } else {
        return "https://thumbs.dreamstime.com/z/young-man-says-no-white-53544424.jpg";
      }
    }

    // const deleteButton = async (e, spot) => {
    //     // e.preventDefault()
    //     await dispatch(deleteASpot(spot))
    // }

    // const setToFalse = () => {
    //     setState(true)
    // }

    return isLoaded && (
        <div>
            <h1 className="user-spots-header">All Your Spots</h1>
            <ul className="allspotsUl user-spots-ul">
                {spotsArr?.map(spot => {
                    // console.log(spot.id)
                    return (
                            <div className="wrap-spots-div">
                        <NavLink className='spots' to={`/spots/${spot.id}`}>
                            <div className="user-spot-name">
                                {spot.name}
                            </div>
                            <div>
                            <img
                                className="img"
                                src={validImage(spot)}
                                alt={spot.name}
                                />
                            </div>
                            {/* <div> */}
                            <div className="first-line">
                                <div className="city-state">
                                {spot.city}, {spot.state}
                                </div>
                                <div className="avg-rating">
                                {/* <div className="star-icon">
                                </div> */}
                                <i className="fa-solid fa-star fa-xs"></i>
                                <div>{Number(spot.avgRating).toFixed(2)}</div>
                                </div>
                            </div>
                            <div>
                                <span className="spot-price">${spot.price} </span>
                                per night
                            </div>
                        </NavLink>
                          <div className="edit-delete-buttons">
                            <EditSpotModal spot={spot} />
                            <button className="user-spots-button"
                              onClick={() => dispatch(deleteASpot(spot.id))}
                              >
                              Delete Spot
                            </button>
                            {/* <button onClick={() => deleteButton(spot)}>Delete Spot</button> */}
                          </div>
                        {/* </div> */}
                      </div>
                    );
                })}
            </ul>
        </div>
    )
}

export default UserSpots