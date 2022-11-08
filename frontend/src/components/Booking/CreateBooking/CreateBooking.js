import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"






const BookingsForm = ({spot}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const date = new Date().toISOString().slice(0, 10);
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [startDate, setStartDate] = useState(tomorrow)
    const [endDate, setEndDate] = useState('')
    const [guest, setGuest] = useState(1)

    
    console.log('THIS IS TOMORROW', tomorrow)
    console.log('this is tomorrow to iso', tomorrow.toISOString().slice(0, 10));


    console.log(startDate)


    console.log(spot)
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
            <div className="booking-form-inputs">
                <div>
                    <label>CHECK-IN</label>
                    <input 
                        type='date'
                        min={tomorrow.toISOString().slice(0,10)}
                        value={startDate.toISOString().slice(0, 10)}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>CHECKOUT</label>
                    <input 
                        type='date'
                        // min={}
                    />
                </div>
                <div>
                    <label>GUESTS</label>
                    <input 
                        type='number'
                        min={1}
                        value={guest}
                    />
                </div>
            </div>
        </div>

    )


}




export default BookingsForm