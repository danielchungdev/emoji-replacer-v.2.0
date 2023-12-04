import "./ActionButton.css"
import { PlusIcon } from '@heroicons/react/24/solid'
import { Modal } from "@components/Modal"
import { useState } from "react"

export const ActionButton = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className="action-button-container" id="container" onClick={openModal} tabIndex={0}>
                <div className="action-button-content">
                    <PlusIcon className="action-button-icon" />
                    <h2 className="action-button-title">Add Emoji</h2>
                </div>
            </div>
            <Modal open={isOpen} close={closeModal}>
                <h1>This is a children component</h1>
            </Modal>
        </>
    )
}