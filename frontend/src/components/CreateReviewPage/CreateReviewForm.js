import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/review";
import { spotReview } from "../../store/review";

const CreateAReview = ({setShowModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // `/spots/:spotId/create/review`
  const { spotId } = useParams();

  const user = useSelector((state) => state.session.user);
  // console.log(user)

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
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

  if (!user) {
    alert("Must be logged in to write a review!");
    history.push("/");
  }

  async function onSubmit(e) {
    e.preventDefault();

    setHasSubmitted(true);
    // if(validationErrors.length) return alert('please check your submission')

    const reviewDetails = {
      spotId: spotId,
      // firstName: user.firstName,
      // lastName: user.lastName,
      review,
      stars,
    };

    const newReview = await dispatch(createReview(reviewDetails))
      // .then(dispatch(spotReview(spotId)))
      // .then(() => {dispatch(spotReview(spotId))})
    //   .then(() => {
    //     history.push(`/spots/${spotId}`);
    //   })
      
        // await dispatch(spotReview(spotId))
      
      .catch(async (res) => {
        // console.log('!!!!!!!!!!!!!!!!', res)
        const data = await res.json();
        console.log(data)
        // console.log('data.errors', data.errors);
        if (data && data.errors) {
          // console.log('please come here')
          setValidationErrors(data.errors);
        }

        // console.log('!!!!!!!!!!!!!!', submissionErrors)
      });

      await dispatch(spotReview(spotId));

      if(newReview){
        setShowModal(false)
      }
    // .then(() => {history.push(`/spots/${spotId}`)})
    // .then(() => {dispatch(spotReview(spotId))})
    // console.log('!!!!!!!!!!!!!!!!!!', reviewByUser)
    // dispatch(spotReview(spotId))

    // if(reviewByUser && !submissionErrors.length){
    //     history.push(`/spots/${spotId}`)
    // }
    }
  return (
    <>
      <div className="signup">
        <h3>Tell people about this spot!</h3>
      </div>
      <div className="signup-form-modal overflow-container">
        <div className="welcome-signup">
            <h2 className="welcome-header">Write review here</h2>
        </div>
        <form onSubmit={onSubmit}>
            <div className="signup-info">
                <div className="input-box">
                    <textarea
                    className="input"
                    id="review"
                    type="text"
                    placeholder="Review: 10-500 characters"
                    minLength="10"
                    maxLength="500"
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    required
                    />
                </div>
                <div className='input-box'>
                    <input
                    className="input"
                    placeholder="Stars: 1-5"
                    id="stars"
                    min={1}
                    max={5}
                    type="number"
                    onChange={(e) => setStars(e.target.value)}
                    value={stars}
                    />
                </div>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <div>
                        <ul>
                            {validationErrors.map((validationError) => (
                            <li className="errors" key={validationError}>{validationError}</li>
                            ))}
                        </ul>
                        </div>
                    )}
                    <div className="signup-button-div">
                        <button className="signup-button" type="submit">Submit</button>
                    </div>
            </div>
          
        </form>
      </div>
    </>
  );
};

export default CreateAReview;
