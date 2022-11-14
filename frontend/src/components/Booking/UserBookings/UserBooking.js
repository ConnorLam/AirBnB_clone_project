import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getUserBookingThunk, updateBookingThunk, deleteBookingThunk } from "../../../store/booking";
import "./UserBooking.css";


const UserBookings = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    if (!user) {
      alert("must be logged in to access");
      history.push("/");
    }

    useEffect(() => {
        if(user){
            dispatch(getUserBookingThunk())
        }
    }, [dispatch, user])

    let bookings = useSelector(state => state.bookings)

    let bookingsArr = Object.values(bookings)
    // console.log(bookings)

    return(
        <div>
            <h2>Your Bookings</h2>
            <div>

            </div>
        </div>
    )

}

export default UserBookings