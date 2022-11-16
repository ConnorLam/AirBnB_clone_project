import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotBookingThunk } from "../../../store/booking";

import './OwnerSpotBookings.css'


const OwnerSpotBookings = ({spot}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const today = new Date().toISOString().slice(0, 10);
    // const user = useSelector((state) => state.session.user)
    // console.log(user)

    const [isLoaded, setIsLoaded] = useState(false);



    const bookings = useSelector((state) => state.bookings);
    const bookingsArr = Object.values(bookings);
    // console.log(bookings)
    // console.log(bookingsArr)


    useEffect(() => {
      dispatch(getSpotBookingThunk(spot.id))
      .then(() => setIsLoaded(true));
    }, [dispatch, spot.id, setIsLoaded]);

  let futureBookings = [];
  for (let booking of bookingsArr) {
    // console.log(booking)
    if (booking.endDate > today) {
      futureBookings.push(booking);
      break;
    }
  }

  if (futureBookings.length < 1) {
    return (
      <h3 className="no-bookings">{spot.name} has no future bookings yet</h3>
    );
  }

  let hasBookings;
  if (bookingsArr.length === 0){
    hasBookings = (
      <h3 className="no-bookings">
        This spot has no bookings
      </h3>
    )
  } else {
    hasBookings = (
      <div className="bookings-data">
        <div className="booking-header">
          <div>Bookings</div>
        </div>
        <div className="table-label">
          <div className="user">
            <div className="actual-label">User</div>
            <div>
              {bookingsArr.map((booking, i) => (
                <div className="each-user" id={booking.endDate < today ? 'display-none' : null} key={i}>
                  {booking.User?.firstName}&nbsp;{booking.User?.lastName}
                </div>
              ))}
            </div>
          </div>
          <div className="start-date">
            <div className="actual-label">Start Date</div>
            <div>
              {bookingsArr.map((booking, i) => (
                <div className="start-end" id={booking.endDate < today ? 'display-none' : null} key={i}>
                  {booking.startDate}
                </div>
              ))}
            </div>
          </div>
          <div className="end-date">
            <div className="actual-label">End Date</div>
            <div>
              {bookingsArr.map((booking, i) => (
                <div className="start-end" id={booking.endDate < today ? 'display-none' : null} key={i}>
                  {booking.endDate}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

    return (
      isLoaded && hasBookings
    );
}


export default OwnerSpotBookings