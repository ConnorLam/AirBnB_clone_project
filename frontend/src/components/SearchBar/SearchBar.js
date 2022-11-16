import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import { getAllSpots } from "../../store/spots";


const SearchBar = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const allSpots = useSelector(state => state.spots)
    console.log(allSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div>
            
            <form>

            </form>
        </div>
    )

}

export default SearchBar