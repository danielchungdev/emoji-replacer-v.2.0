import "./EmojiGrid.css"
import { ActionButton } from '@components/ActionButton';
import { EmojiButton } from "@components/EmojiButton";
import { Modal } from "@components/Modal";
import { AddModal } from "@components/AddModal/AddModal";
import { useState, useEffect } from "react";
import { EmojisObjects } from "./types";

export const EmojiGrid = () => {

    const fetchEmojis = async () => {
        const rows = await window.ipcRenderer.invoke("db-query", "SELECT * FROM Emojis")
        setEmojis(rows)
    }

    useEffect( () => {
        fetchEmojis()
    }, [])

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [emojis, setEmojis] = useState<EmojisObjects[]>([])

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
                {
                   (emojis.length > 0) ? emojis.map( (emojiObject) => (
                    <EmojiButton emoji={emojiObject.emoji} name={emojiObject.keyword} delimiter=":"/> 
                   )) : <p>No emojis yet, add some!</p>
                }

            </div>

            <Modal open={isOpen} close={closeModal} key={new Date().getTime()}>
                <AddModal closeModal={closeModal}/>
            </Modal>
        </>
    )
}