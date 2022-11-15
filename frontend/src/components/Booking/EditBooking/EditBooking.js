import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBookingThunk, getSpotBookingThunk } from "../../../store/booking";
import './EditBooking.css'

const EditBooking = ({booking}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)


    console.log(booking)

    const date = new Date();
    const isoDate = date.toISOString().slice(0, 10);
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const [showModal, setShowModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [startDate, setStartDate] = useState(booking.startDate || "");
    const [validationErrors, setValidationErrors] = useState([]);
    const newStartDate = new Date(startDate ? startDate : null);
    const dayAfterStart = new Date();
    dayAfterStart.setDate(newStartDate.getDate() + 1);
    const [endDate, setEndDate] = useState(booking.endDate || "");
    const bookingsArr = booking.Spot.booking;

    useEffect(() => {
      const errors = [];

      if (!startDate || !endDate)
        errors.push("Please select check-in and checkout dates");
      if (startDate && endDate && endDate < startDate)
        errors.push("Checkout date must be after check-in date");
      if (startDate && endDate && startDate === endDate)
        errors.push("Must book spot for at least a day");

      let bookingConflict = false;

      bookingsArr.forEach((booking) => {
        let reqStartDateParse = Date.parse(startDate);
        let reqEndDateParse = Date.parse(endDate);
        let existingStartBooking = Date.parse(booking.startDate);
        let existingEndBooking = Date.parse(booking.endDate);

        if (
          (reqStartDateParse >= existingStartBooking &&
            reqStartDateParse <= existingEndBooking) ||
          (reqEndDateParse >= existingStartBooking &&
            reqEndDateParse <= existingEndBooking)
        ) {
          bookingConflict = true;
        }
      });

      if (bookingConflict === true) {
        errors.push(
          `Sorry, this spot is already booked for the specified dates`
        );
      }

      return setValidationErrors(errors);
    }, [startDate, endDate]);

    const onSubmit = async (e) => {
        e.preventDefault()


        setIsSubmitted(true)

        if(validationErrors.length > 0) return

        const bookingDetails = {
            spotId: booking.id,
            startDate: startDate,
            endDate: endDate
        }

        const newBooking = await dispatch(updateBookingThunk(bookingDetails))

        alert(`You have edited your booking dates on ${booking.Spot.name}`)

    }




    

    return (
        <div className="edit-booking-form">
            <h3 className="header">
                Edit your booking dates
            </h3>
            <div className="form-added-bookings">
                <form onSubmit={onSubmit} className="booking-form-inputs">
                    <div className="input-boxes">
                    <div className="check-in">
                        <div className="label">
                            <label>CHECK-IN</label>
                        </div>
                        <input
                        type="date"
                        // allowInputToggle={true}
                        min={isoDate}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="checkout">
                        <div className="label">
                            <label>CHECKOUT</label>
                        </div>
                        <input
                        type="date"
                        min={startDate ? dayAfterStart.toISOString().slice(0, 10) : isoDate}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    </div>
                    {/* <div>
                            <label>GUESTS</label>
                            <input 
                                type='number'
                                min={1}
                                value={guest}
                                onChange={(e) => setGuest(e.target.value)}
                            />
                        </div> */}
                    {isSubmitted && validationErrors.length > 0 && (
                    <div>
                        <div>
                        {validationErrors.map((error) => (
                            <li className="errors" key={error}>
                            {error}
                            </li>
                        ))}
                        </div>
                    </div>
                    )}
                    <div className="div-reserve-button">
                        <button className="reserve-button" type="submit">
                            Reserve
                        </button>
                    </div>
                </form>
                <div className="bookings-data">
                    <div className="booking-header">
                        <div>Bookings</div>
                    </div>
                    <div className="table-label">
                        <div className="start-date">
                        <div className="actual-label">Start Date</div>
                            <div>
                            {bookingsArr.map((eachBooking, i) => (
                                <div className={eachBooking.startDate === booking.startDate ? "start-end user-booking": 'start-end'} key={i}>
                                    {eachBooking.startDate}
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className="end-date">
                        <div className="actual-label">End Date</div>
                            <div>
                            {bookingsArr.map((eachBooking, i) => (
                                <div className={eachBooking.endDate === booking.endDate ? "start-end user-booking": 'start-end'} key={i}>
                                    {eachBooking.endDate}
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditBooking