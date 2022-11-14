import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotBookingThunk } from "../../../store/booking";

// import "./OwnerSpotBookings.css";

const SpotBookings = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const bookings = useSelector((state) => state.bookings);
  const bookingsArr = Object.values(bookings);
//   console.log(bookings);
  console.log(bookingsArr);

  useEffect(() => {
    dispatch(getSpotBookingThunk(spot.id)).then(() => setIsLoaded(true));
  }, [dispatch, spot.id, setIsLoaded]);

  let hasBookings;
  if (bookingsArr.length === 0){
    hasBookings = (
      <div className="no-bookings">
        This spot has no bookings
      </div>
    )
  } else {
    hasBookings = (
      <div className="bookings-data">
        <div className="booking-header">
          <div>Bookings</div>
        </div>
        <div className="table-label">
          <div className="start-date">
            <div className="actual-label">Start Date</div>
            <div>
              {bookingsArr.map((booking, i) => (
                <div className="start-end" key={i}>
                  {booking.startDate}
                </div>
              ))}
            </div>
          </div>
          <div className="end-date">
            <div className="actual-label">End Date</div>
            <div>
              {bookingsArr.map((booking, i) => (
                <div className="start-end" key={i}>
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
};

export default SpotBookings;
