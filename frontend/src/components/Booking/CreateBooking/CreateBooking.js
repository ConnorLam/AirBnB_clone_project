import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBookingThunk, getSpotBookingThunk } from "../../../store/booking"

import './CreateBooking.css'






const BookingsForm = ({spot}) => {

    // console.log('this is the spot', spot)

    
    const user = useSelector(state => state.session.user)
    
    
    // console.log(user)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const bookings = useSelector(state => state.bookings)
    const bookingsArr = Object.values(bookings)
    // const bookingsArrMap = bookingsArr.map(booking => {
    //     return console.log(booking.startDate)    
    // })

    // console.log(bookingsArrMap)
    
    const date = new Date();
    const isoDate = date.toISOString().slice(0, 10);
    const today = new Date();
    const tomorrow = new Date();
    
    tomorrow.setDate(today.getDate() + 1);
    
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const newStartDate = new Date(startDate ? startDate : null);
    const dayAfterStart = new Date()
    dayAfterStart.setDate(newStartDate.getDate() + 1)
    const [endDate, setEndDate] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    // const [guest, setGuest] = useState('')
    console.log(startDate)
    console.log(newStartDate)
    console.log(dayAfterStart)
    // console.log(startDate)
    // console.log(endDate)
    useEffect(() => {
        dispatch(getSpotBookingThunk(spot.id))
        .then(() => setIsLoaded(true))
    }, [dispatch, spot.id, setIsLoaded])


    useEffect(() => {
        const errors = []

        if (!startDate || !endDate) errors.push('Please select check-in and checkout dates')
        if (startDate && endDate && endDate < startDate) errors.push('Checkout date must be after check-in date')
        if (startDate && endDate && startDate === endDate) errors.push('Must book spot for at least a day')

        let bookingConflict = false


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

        if (bookingConflict === true){
            errors.push(`Sorry, this spot is already booked for the specified dates`)
        }
        // if (guest <= 0) errors.push('Must book for at least 1 guest')
        // if()



        return setValidationErrors(errors)
    }, [startDate, endDate])

    const onSubmit = async (e) => {
        e.preventDefault()


        setIsSubmitted(true)

        if(validationErrors.length > 0) return

        const bookingDetails = {
            spotId: spot.id,
            startDate: startDate,
            endDate: endDate
        }

        const newBooking = await dispatch(createBookingThunk(bookingDetails))

        alert(`You have booked ${spot.name}`)
        setIsSubmitted(false)
        setStartDate('')
        setEndDate('')

    }
    
    // console.log('HIHIHIHIIHIH', dayAfterStart.toISOString().slice(0, 10))
    
    // console.log('THIS IS TOMORROW', tomorrow)
    // console.log('this is tomorrow to iso', tomorrow.toISOString().slice(0, 10));


    // console.log(startDate)
    // console.log(endDate)

    // const newStartDate = new Date(startDate)
    // console.log(newStartDate)


    // console.log(spot)
    return (
      isLoaded && (
        <>
          <div className="spot-info-booking">
            <div>
              <span className="price">${spot.price}</span>{" "}
              <span className="night">night</span>
            </div>
            <div className="stars-reviews">
              <div className="star">
                <i className="fa-solid fa-star fa-2xs"></i>
                {Number(spot.avgRating).toFixed(1)} ·
              </div>
              &nbsp;
              <div className="review">
                {spot.numReviews} {spot.numReviews !== 1 ? "reviews" : "review"}
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit} className="booking-form-inputs">
            <div className="input-boxes">
              <div className="check-in">
                <div className="label">
                    <label>CHECK-IN</label>
                </div>
                <input
                  type="date"
                  allowInputToggle={true}
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
        </>
      )
    );


}




export default BookingsForm