import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getUserBookingThunk, deleteBookingThunk } from "../../../store/booking";
import EditBookingModal from "../EditBooking/EditBookingModal";
import "./UserBooking.css";


const UserBookings = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false)
    const today = new Date().toISOString().slice(0, 10);

    if (!user) {
      alert("must be logged in to access");
      history.push("/");
    }

    let bookings = useSelector(state => state.bookings)
    let bookingsArr = Object.values(bookings)

    useEffect(() => {
        bookingsArr = Object.values(bookings)
    }, [bookings])

    useEffect(() => {
            dispatch(getUserBookingThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch, user])

    // console.log(bookingsArr)
    // console.log(bookings)
    if(bookingsArr.length === 0){
        return <h2>No spots available</h2>
    }

    function validImage(spot) {
      if (spot?.previewImage) {
        return spot?.previewImage;
      } else {
        return "https://thumbs.dreamstime.com/z/young-man-says-no-white-53544424.jpg";
      }
    }
    
    // const handleDelete = async (e) => {
    //     e.preventDefault()
    //     setIsLoaded(false)
    //     await dispatch(deleteBookingThunk(booking.id))
    //     .then(() => setIsLoaded(true))
    // }

    return (
      isLoaded && (
        <div>
          <h1 className="user-spots-header">Your Bookings</h1>
          <div className="past-booking-warning">Past bookings cannot be updated</div>
          <ul className="allspotsUl">
            {bookingsArr.map((booking, i) => (
              <div className={booking.startDate <= today ||
                  booking.endDate <= today ? "wrap-spots-div opaque": 'wrap-spots-div'} id={booking.endDate < today ? 'display-none': null}key={i}>
                <NavLink className="spots" to={`/spots/${booking.Spot?.id}`}>
                  <div className="user-spot-name">{booking.Spot?.name}</div>
                  {booking.startDate <= today ||
                  booking.endDate <= today ? <div className="booking-dates past-booking-title">Past Booking</div> : (
                    <div className="booking-dates">
                      {booking.startDate} to {booking.endDate}
                    </div>
                  )}
                  {/* <div className="booking-dates">
                    {booking.startDate} to {booking.endDate}
                  </div> */}
                  <div>
                    <img
                      className="img"
                      src={validImage(booking.Spot)}
                      alt={booking.Spot?.name}
                    />
                  </div>
                  {/* <div> */}
                  <div className="first-line">
                    <div className="city-state">
                      {booking.Spot?.city}, {booking.Spot?.state}
                    </div>
                  </div>
                  <div>
                    <span className="spot-price">${booking.Spot?.price} </span>
                    per night
                  </div>
                </NavLink>
                {booking.startDate <= today ||
                booking.endDate <= today ? null : (
                  <div className="edit-delete-buttons">
                    <EditBookingModal booking={booking} />

                    <button
                      className="user-spots-button"
                      onClick={() =>
                        dispatch(
                          deleteBookingThunk({
                            startDate: booking.startDate,
                            id: booking.id,
                          })
                        )
                      }
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
                {/* <div className="edit-delete-buttons">
                  <EditBookingModal spot={booking.Spot} />

                  <button
                    className="user-spots-button"
                    onClick={() =>
                      dispatch(
                        deleteBookingThunk({
                          startDate: booking.startDate,
                          id: booking.id,
                        })
                      )
                    }
                  >
                    Cancel Booking
                  </button>
                </div> */}
              </div>
            ))}
          </ul>
        </div>
      )
    );

}

export default UserBookings