import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createBookingThunk } from "../../../store/booking"






const BookingsForm = ({spot}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

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
    const [guest, setGuest] = useState(1)

    useEffect(() => {
        const errors = []

        if (!startDate || !endDate) errors.push('Please select check-in and checkout dates')
        if (endDate <= startDate) errors.push('Checkout date must be after check-in date')
        if (startDate === endDate) errors.push('Must book spot for at least a day')
        if (guest <= 0) errors.push('Must book for at least 1 guest')
        // if()



        return setValidationErrors(errors)
    }, [startDate, endDate, guest])

    const onSubmit = async (e) => {
        e.preventDefault()


        setIsSubmitted(true)

        const bookingDetails = {
            
        }

    }
    
    // console.log('HIHIHIHIIHIH', dayAfterStart.toISOString().slice(0, 10))
    
    // console.log('THIS IS TOMORROW', tomorrow)
    // console.log('this is tomorrow to iso', tomorrow.toISOString().slice(0, 10));


    // console.log(startDate)
    // console.log(endDate)

    // const newStartDate = new Date(startDate)
    // console.log(newStartDate)


    // console.log(spot)
    return(
        <div>
            <div className="spot-info-booking">
                <div>
                    ${spot.price}
                </div>
                <div>
                    <i className="fa-solid fa-star fa-xs"></i>
                    {Number(spot.avgRating).toFixed(2)}
                </div>
                <div>
                    {spot.numReviews} reviews
                </div>
            </div>
            <form className="booking-form-inputs">
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
                <div>
                    <label>GUESTS</label>
                    <input 
                        type='number'
                        min={1}
                        value={guest}
                        onChange={(e) => setGuest(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Reserve</button>
                </div>
            </form>
        </div>

    )


}




export default BookingsForm