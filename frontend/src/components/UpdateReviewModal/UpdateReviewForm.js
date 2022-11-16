import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { spotReview } from "../../store/review";
import { getSpotById } from "../../store/spots";
import { updateReview } from "../../store/review";

const EditReviewForm = ({review, user, setShowModal}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    let spotId = review.spotId
    
    const [editReview, setEditReview] = useState(review.review || "");
    const [stars, setStars] = useState(review.stars || "");
    const [validationErrors, setValidationErrors] = useState([]);
    // const [submissionErrors, setSubmissionErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    async function onSubmit(e) {
      e.preventDefault();

      setHasSubmitted(true);

      const reviewDetails = {
        spotId: spotId,
        review: editReview,
        stars,
        id: review.id
      };

      const editedReview = await dispatch(updateReview(reviewDetails))
        // .then(dispatch(spotReview(spotId)))
        // .then(() => {dispatch(spotReview(spotId))})
        //   .then(() => {
        //     history.push(`/spots/${spotId}`);
        //   })

        // await dispatch(spotReview(spotId))

        .catch(async (res) => {
          // console.log('!!!!!!!!!!!!!!!!', res)
          const data = await res.json();
          console.log(data);
          // console.log('data.errors', data.errors);
          if (data && data.errors) {
            // console.log('please come here')
            setValidationErrors(data.errors);
          }

          // console.log('!!!!!!!!!!!!!!', submissionErrors)
        });

        
    if (editedReview) {
        await dispatch(spotReview(spotId));
        await dispatch(getSpotById(spotId));
        setShowModal(false);
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
          <h3>Want to edit your review?</h3>
        </div>
        <div className="signup-form-modal overflow-container">
          <div className="welcome-signup">
            <h2 className="welcome-header">Edit review here!</h2>
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
                  onChange={(e) => setEditReview(e.target.value)}
                  value={editReview}
                  required
                />
              </div>
              <div className="input-box">
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
                      <li className="errors" key={validationError}>
                        {validationError}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="signup-button-div">
                <button className="signup-button" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
}

export default EditReviewForm