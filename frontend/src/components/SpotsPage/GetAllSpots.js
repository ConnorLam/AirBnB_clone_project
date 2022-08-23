import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"; 

import { getAllSpots } from "../../store/spots";


const GetSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    let spots = useSelector(state => state.spots)
    // console.log(spots)
    let spotsArr = Object.values(spots)
    console.log(spotsArr)
    if (!spotsArr){
        return null
    }

    return (
        <div>
            <ul>
                {spotsArr.map(spot => {
                    return (
                        <li key={spot.id}>
                            <NavLink className='Spots' to={`/spots/${spot.id}`}> 
                                {spot.address} {spot.city} {spot.avgRating} {`$${spot.price} night`} 
                                <img src={spot.previewImage} alt={spot.name}/>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    ) 

}


export default GetSpots