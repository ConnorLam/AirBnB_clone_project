import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from "react-router-dom"; 

import { getUserSpots } from "../../store/spots";
import { deleteASpot } from "../../store/spots";


const UserSpots = () => {

    const history = useHistory()
    // const [state, setState] = useState(false) 

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    if(!user){
        alert('must be logged in to access')
        history.push('/')
    }
    
    useEffect(() => {
        if(user){
            dispatch(getUserSpots())
        }
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

    return (
        <div>
            <h2>All Your Spots</h2>
            <ul>
                {spotsArr?.map(spot => {
                    return(
                        <div>
                            <div>
                                <img src={validImage(spot)} alt={spot.name}/>
                            </div>
                            <div>
                                {spot.name}, {spot.city}, 
                                <div>
                                    <NavLink to={'/spots/edit'}>Edit Info</NavLink>
                                    <button onClick={() => dispatch(deleteASpot(spot.id))}>Delete Spot</button>
                                    {/* <button onClick={() => deleteButton(spot)}>Delete Spot</button> */}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default UserSpots