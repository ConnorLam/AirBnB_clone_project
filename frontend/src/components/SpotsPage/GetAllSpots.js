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
                        <>
                            <div key={spot.id}>
                                <NavLink className='Spots' to={`/spots/${spot.id}`}>
                                    <div>
                                        <img src={spot.previewImage} alt={spot.name}/>
                                    </div>
                                    <div>
                                        {spot.city}, {spot.state}
                                    </div>  
                                    <div>
                                        {spot.avgRating}
                                    </div>  
                                    <div>
                                        {`$${spot.price} night`} 
                                    </div>  
                                </NavLink>
                            </div>
                        </>
                    )
                })}
            </ul>
        </div>
    ) 

}


export default GetSpots