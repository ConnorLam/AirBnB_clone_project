import CreateSpot from "./CreateSpotForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const CreateSpotModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user-spots-button" onClick={() => setShowModal(true)}>
        Host A Spot
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpot setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default CreateSpotModal;
