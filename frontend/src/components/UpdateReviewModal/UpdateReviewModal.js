import { updateReview } from "../../store/review";
import { useDispatch } from "react-redux";
import './UpdateReview.css'
import { Modal } from "../../context/Modal";
import EditReviewForm from "./UpdateReviewForm";
import { useState } from "react";


const UpdateReviewModal = ({review, user}) => {
    const [showModal, setShowModal] = useState(false);

    let modal;
    if(!user || user.id !== review.userId){
        modal = (
            null
        )
    } else {
        modal = (
            <>
        <div className='edit-review'>
          <i onClick={() => setShowModal(true)} class="fa-regular fa-pen-to-square edit"></i>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditReviewForm review={review} user={user} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
        )
    }

    return (
      <>
        {modal}
      </>
    );
}

export default UpdateReviewModal