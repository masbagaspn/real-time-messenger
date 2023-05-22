'use client'

import Button from "../buttons/Button"
import Modal from "../modals/Modal"

interface LogoutModalProps {
    isOpen: boolean,
    onClose: () => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="w-11 h-11 flex flex-col">
            <h2 className="tracking-tighter font-bold text-sky-800 text-lg">Log out of SWIVT ?</h2>
            <p>You can always logging back in at any times.</p>
            <div className="flex space-x-6">
                <Button>Cancel</Button>
                <Button>Logout</Button>
            </div>
        </div>
    </Modal>
  )
}

export default LogoutModal