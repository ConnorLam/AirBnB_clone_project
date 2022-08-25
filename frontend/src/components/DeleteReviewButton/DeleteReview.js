import { deleteASpot } from "../../store/review";
import { useDispatch } from "react-redux";

const DeleteSpot = ({review, user}) => {
    const dispatch = useDispatch()
    // console.log(user)
    // console.log(review)
    const userId = user.id
    const reviewUserId = review.userId
    let button;
    if(userId === reviewUserId){
        button = (
          <button onClick={() => dispatch(deleteASpot(review.id))}>
            Delete Review
          </button>
        );
    } else {
        button = (
            <div></div>
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