import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBookingThunk, getSpotBookingThunk } from "../../../store/booking"






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
    return isLoaded && (
        <div>
            <div className="spot-info-booking">
                <div>
                    ${spot.price} night
                </div>
                <div>
                    <i className="fa-solid fa-star fa-xs"></i>
                    {Number(spot.avgRating).toFixed(2)}
                </div>
                <div>
                    {spot.numReviews} reviews
                </div>
            </div>
            <form onSubmit={onSubmit} className="booking-form-inputs">
                <div>
                    <label>CHECK-IN</label>
                    <input 
                        type='date'
                        min={isoDate}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>CHECKOUT</label>
                    <input 
                        type='date'startDate
                        min={dayAfterStart.toISOString().slice(0, 10)}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
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
                        <ul>
                            {validationErrors.map(error => (
                                <li className="errors" key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                    <button type="submit">Reserve</button>
                </div>
            </form>
        </div>

    )


}




export default BookingsForm