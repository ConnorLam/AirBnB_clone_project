import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/review";
import { spotReview } from "../../store/review";


const CreateAReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // `/spots/:spotId/create/review`
    const {spotId} = useParams()

    const user = useSelector(state => state.session.user)
    // console.log(user)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [validationErrors, setValidationErrors] = useState([]);
    // const [submissionErrors, setSubmissionErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // useEffect(() => {
    //     const errors = []
    //     if(review.length < 10 || review.length > 500) errors.push('Reviews must be between 10 and 500 characters')
    //     if(stars < 1 || stars > 5) errors.push('Please put stars between 1 and 5')

    //     return setValidationErrors(errors)
    // }, [review, stars])

    // console.log(Error)
    

    if(!user){
        alert('Must be logged in to write a review!')
        history.push('/')
    }

    function onSubmit(e){
        e.preventDefault()
        
        setHasSubmitted(true)
        // if(validationErrors.length) return alert('please check your submission')

        const reviewDetails = {
            spotId: spotId,
            // firstName: user.firstName, 
            // lastName: user.lastName,
            review,
            stars
        }

        dispatch(createReview(reviewDetails))
            // .then(dispatch(spotReview(spotId)))
            // .then(() => {dispatch(spotReview(spotId))})
            .then(() => {history.push(`/spots/${spotId}`)})
            .then(() => {dispatch(spotReview(spotId))})
            .catch(async (res) => {
                const data = await res.json();
                // console.log('data.errors', data.errors);
                if (data && data.errors) {
                    // console.log('please come here')
                    setValidationErrors(data.errors);
                }
                
                // console.log('!!!!!!!!!!!!!!', submissionErrors)
            })
            // .then(() => {history.push(`/spots/${spotId}`)})
            // .then(() => {dispatch(spotReview(spotId))})
              // console.log('!!!!!!!!!!!!!!!!!!', reviewByUser)
        // dispatch(spotReview(spotId))

        // if(reviewByUser && !submissionErrors.length){
        //     history.push(`/spots/${spotId}`)
        // }
    }
    return (
        <div>
            <h2>Tell people how you liked this spot.</h2>
            <h3>Only one review per spot please</h3>
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
                    <input 
                        id="review"
                        type='text'
                        placeholder="10-500 characters"
                        minlength='10'
                        maxlength='500'
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stars">Stars</label>
                    <input
                        id="stars"
                        min={1}
                        max={5}
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
