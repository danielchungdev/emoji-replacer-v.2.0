import "./EmojiGrid.css"
import { ActionButton } from '@components/ActionButton';
import { EmojiButton } from "@components/EmojiButton";
import { Modal } from "@components/Modal";
import { AddModal } from "@components/AddModal/AddModal";
import { useState, useEffect } from "react";
import { EmojisObjects } from "./types";
import { useOpen } from "@hooks/useOpen";

export const EmojiGrid = () => {

    const { isOpen, open, close } = useOpen();
    const [emojis, setEmojis] = useState<EmojisObjects[]>([]);

    const fetchEmojis = async () => {
        const rows = await window.ipcRenderer.invoke("db-query", "SELECT ROWID, keyword, emoji FROM Emojis")
        setEmojis(rows)
    }

    useEffect( () => {
        fetchEmojis()
    }, [])

    return (
        <>
            <div className='main-content'>
                <ActionButton onClick={open} key={-1}/>
                {
                   (emojis.length > 0) ? emojis.map( (emojiObject) => (
                    <EmojiButton emoji={emojiObject.emoji} name={emojiObject.keyword} delimiter=":" id={emojiObject.rowid} refetch={fetchEmojis}/> 
                   )) : <p>No emojis yet, add some!</p>
                }
            </div>

            <Modal open={isOpen} close={close} key={new Date().getTime()}>
                <AddModal closeModal={close}/>
            </Modal>
        </>
    )
}