import "./EmojiGrid.css"
import { ActionButton } from '@components/ActionButton';
import { EmojiButton } from "@components/EmojiButton";
import { Modal } from "@components/Modal";
import { AddModal } from "@components/AddModal/AddModal";
import { useState } from "react";

export const EmojiGrid = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className='main-content'>
                <ActionButton onClick={openModal}/>
                <EmojiButton emoji='🔥' name='fire' delimiter=':' />
                <EmojiButton emoji='🔥' name='fire' delimiter=':' />
                <EmojiButton emoji='🔥' name='fire' delimiter=':' />

            </div>

            <Modal open={isOpen} close={closeModal} key={new Date().getTime()}>
                <AddModal closeModal={closeModal}/>
            </Modal>
        </>
    )
}