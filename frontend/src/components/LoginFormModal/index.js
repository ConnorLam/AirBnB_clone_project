import LoginForm from "./LoginForm";
import {useState} from 'react'
import { Modal } from "../../context/Modal";

const LoginFormModal = () => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="login-modal-button" onClick={() => setShowModal(true)}>Log In</button> 
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal
