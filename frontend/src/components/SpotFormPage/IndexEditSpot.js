import EditSpot from "./EditSpotForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const EditSpotModal = ({spot}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Edit Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot spot={spot}/>
        </Modal>
      )}
    </>
  );
};

export default EditSpotModal;
