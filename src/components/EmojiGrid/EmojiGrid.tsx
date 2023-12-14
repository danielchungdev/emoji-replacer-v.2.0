import "./EmojiGrid.css"
import { ActionButton } from '@components/ActionButton';
import { EmojiButton } from "@components/EmojiButton";
import { Modal } from "@components/Modal";
import { AddModal } from "@components/AddModal/AddModal";
import { useEffect } from "react";
import { useOpen } from "@hooks/useOpen";
import { useDatabase } from "@hooks/useDatabase";

export const EmojiGrid = () => {

    const { isOpen, open, close } = useOpen();
    const { emojis, getEmojis } = useDatabase()

    useEffect( () => {
        getEmojis()
    }, [])

    return (
        <>
            <div className='main-content'>
                <ActionButton onClick={open} key={0}/>
                {
                   (emojis.length > 0) ? emojis.map( (emojiObject) => (
                        <EmojiButton key={emojiObject.id} emoji={emojiObject.emoji} name={emojiObject.keyword} delimiter=":" id={emojiObject.id} refetch={getEmojis}/>
                   )) : <p>No emojis yet, add some!</p>
                }
            </div>

            <Modal open={isOpen} close={close} key={new Date().getTime()}>
                <AddModal closeModal={close} refetch={getEmojis}/>
            </Modal>
        </>
    )
}