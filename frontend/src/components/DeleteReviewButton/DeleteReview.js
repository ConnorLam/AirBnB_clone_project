import { deleteASpot } from "../../store/review";
import { useDispatch } from "react-redux";
import './DeleteReview.css'

const DeleteSpot = ({review, user}) => {
    const dispatch = useDispatch()
    // console.log(user)
    // console.log(review)
    // const userId = user.id
    const reviewUserId = review.userId
    let button;
    if(!user || user.id !== reviewUserId){
        button = (
          //   <button onClick={() => dispatch(deleteASpot(review.id))}>
          //     Delete Review
          //   </button>
          <div></div>
        );
    } else {
        button = (
            <button className="delete-review-button" onClick={() => dispatch(deleteASpot(review.id))}>
              Delete Review
            </button>
        )
    }
    return(
        // {userId === reviewUserId ? <button onClick={() => dispatch(deleteASpot(review.id))}>Delete Review</button>}
        // <button onClick={() => dispatch(deleteASpot(review.id))}>Delete Review</button>
        <>
            {button}
        </>
    )
}


export default DeleteSpot