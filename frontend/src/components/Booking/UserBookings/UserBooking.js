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
    console.log(today)

    if (!user) {
      alert("must be logged in to access");
      history.push("/");
    }

    // let state = useSelector(state => console.log(state))

    let bookings = useSelector(state => state.bookings)
    // console.log(bookings)
    let bookingsArr = Object.values(bookings)

    // useEffect(() => {
    //     bookingsArr = Object.values(bookings)
    // }, [bookings])

    useEffect(() => {
            dispatch(getUserBookingThunk())
            .then(() => setIsLoaded(true))
    }, [dispatch, user])

    if(bookingsArr.length < 1){
      return <div className="no-bookings-yet">You have no bookings yet</div>
    }
    
    let futureBookings = []
    for (let booking of bookingsArr){
      // console.log(booking)
      if(booking.endDate > today){
        futureBookings.push(booking)
        break
      }
    }

    
    // console.log(bookingsArr)
    // console.log(bookings)
    if(futureBookings.length < 1){
      return <div className="no-bookings-yet">You have no future bookings yet</div>;
    }

    // console.log(bookingsArr)

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
    // (bookingsArr.forEach(booking => {
    //   console.log(booking.endDate)
    //   console.log(today)
    //   console.log(booking.endDate < today)
    // }))


    return (
      isLoaded && (
        <div>
          <h1 className="user-spots-header">Your Bookings</h1>
          <div className="past-booking-warning">
            Past or current bookings cannot be updated
          </div>
          <ul className="allspotsUl">
            {bookingsArr.map((booking, i) => (
              <div
                className={
                  booking.startDate <= today || booking.endDate <= today
                    ? "wrap-spots-div opaque"
                    : "wrap-spots-div"
                }
                id={booking.endDate < today ? "display-none" : null}
                key={i}
              >
                <NavLink className="spots" to={`/spots/${booking.Spot?.id}`}>
                  <div className="user-spot-name">{booking.Spot?.name}</div>
                  {booking.startDate < today && booking.endDate >= today ? (
                    <div className="booking-dates past-booking-title">
                        {booking.startDate} to {booking.endDate}
                    </div>
                  ) : (
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
                {booking.startDate < today ||
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