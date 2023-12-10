import React from 'react'
import Modal from 'react-modal'
import styles from './ConfirmationModal.module.css'

interface ConfirmationModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onConfirm: () => void
  message: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className={styles.ConfirmationModal}
    >
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  )
}

export default ConfirmationModal
