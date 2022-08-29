import EditSpot from "./EditSpotForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const EditSpotModal = ({spot}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user-spots-button" onClick={() => setShowModal(true)}>
        Edit Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default EditSpotModal;
