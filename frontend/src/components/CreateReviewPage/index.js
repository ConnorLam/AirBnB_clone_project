import CreateAReview from "./CreateReviewForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const CreateReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="signup-modal-button"
        onClick={() => setShowModal(true)}
      >
        Write a Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateAReview setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default CreateReviewModal;
