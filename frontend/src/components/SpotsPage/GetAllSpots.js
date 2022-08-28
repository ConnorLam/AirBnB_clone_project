import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"; 

import { getAllSpots } from "../../store/spots";
import './GetAllSpots.css'


const GetSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    let spots = useSelector(state => state.spots)
    // console.log(spots)
    let spotsArr = Object.values(spots)
    // console.log(spotsArr)
    if (!spotsArr){
        return null
    }

    // function validImage(spot) {
    //   if (spot.previewImage) {
    //     return spot.previewImage;
    //   } else {
    //     return "https://thumbs.dreamstime.com/z/young-man-says-no-white-53544424.jpg";
    //   }
    // }

    // function validReview(spot){
    //     if (spot.avgRating) {
    //         return (
    //           <>
    //             <div className="star-icon">
    //                 <i class="fa-solid fa-star fa-xs"></i>

    //             </div>
    //                 {spot.avgRating.toFixed(2)}
    //            </> 
    //         );
    //     } else {
    //         return 'No reviews yet'
    //     }
    // }

    return (
        <div className="allspots-div">
            <ul className="allspotsUl">
                {spotsArr.map(spot => {
                    return (
                      <div className="wrap-spots-div" key={spot.id}>
                        <NavLink className="spots" to={`/spots/${spot.id}`}>
                          <div>
                            <img
                              className="img"
                              src={spot.previewImage}
                              alt={""}
                            />
                          </div>
                          <div className="first-line">
                            <div className="city-state">
                              {spot.city}, {spot.state}
                            </div>
                            <div className="avg-rating">
                              {/* <div className="star-icon">
                              </div> */}
                                <i class="fa-solid fa-star fa-xs"></i>
                                <div>
                                    {Number(spot.avgRating).toFixed(2)}
                                </div>
                            </div>
                          </div>
                          <div>
                            <span className="spot-price">${spot.price}</span> per night
                          </div>
                        </NavLink>
                      </div>
                    );
                })}
            </ul>
        </div>
    ) 

}


export default GetSpots