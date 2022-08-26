import SignupFormPage from "./SignupForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const SignUpFormModal = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup-modal-button' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal