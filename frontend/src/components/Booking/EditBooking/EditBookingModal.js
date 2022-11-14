import EditBooking from "./EditBooking";
import { useState } from "react";
import { Modal } from "../../../context/Modal";

const EditBookingModal = ({ spot }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <>
      <button className="user-spots-button" onClick={openModal}>
        Edit Booking
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBooking spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default EditBookingModal;
