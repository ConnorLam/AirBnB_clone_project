import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/review";


const CreateAReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // `/spots/:spotId/create/review`
    const {spotId} = useParams()

    const user = useSelector(state => state.session.user)
    console.log(user)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if(review.length < 10 || review.length > 500) errors.push('Reviews must be between 10 and 500 characters')
        if(stars < 1 || stars > 5) errors.push('Please put stars between 1 and 5')

        return setValidationErrors(errors)
    }, [review, stars])

    // console.log(Error)
    

    if(!user){
        alert('Must be logged in to write a review!')
        history.push('/')
    }

    async function onSubmit(e){
        e.preventDefault()
        
        setHasSubmitted(true)
        if(validationErrors.length) return alert('please check your submission')

        const reviewDetails = {
            spotId: spotId,
            // firstName: user.firstName, 
            review,
            stars
        }

        const reviewByUser = await dispatch(createReview(reviewDetails))

        if(reviewByUser){
            history.push(`/spots/${spotId}`)
        }
    }
    return (
        <div>
            <h2>Tell people how you liked this spot.</h2>
            <form onSubmit={onSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        Please check your form for errors
                        <ul>
                            {validationErrors.map((validationError => (
                                <li key={validationError}>{validationError}</li>
                            )))}
                        </ul>
                    </div>
                )}
                <div>
                    <label htmlFor="review">Review:</label>
                    <textarea 
                        id="review"
                        type='text'
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                    />
                </div>
                <div>
                    <label htmlFor="stars">Stars</label>
                    <input
                        id="stars"
                        type='number'
                        onChange={(e) => setStars(e.target.value)}
                        value={stars}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}


export default CreateAReview
