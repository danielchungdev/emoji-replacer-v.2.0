import { useState, ChangeEvent, FC } from "react"
import "./AddModal.css"
import { Props } from "./types"
import { useError } from "@hooks/useError"
import { useDatabase } from "@hooks/useDatabase"

export const AddModal: FC<Props> = ({ closeModal, refetch }) => {

    const [emoji, setEmoji] = useState<string>("🔥")
    const [shortcut, setShortcut] = useState<string>("fire")
    const { isError, error, defineError, clearError } = useError()
    const { addToDatabase } = useDatabase()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "emoji") {
            setEmoji(e.target.value)
        }
        if (e.target.name === "shortcut") {
            setShortcut(e.target.value)
        }
    }

    const handleAdd = () => {
        addToDatabase(shortcut, emoji, clearError, defineError, closeModal, refetch)
    }

    return (
        <div className="action-modal-content">
            <h1 className="modal-title">Add Emoji</h1>
            <div className="input-modal">
                <input className="action-inputs emoji-input" style={{ width: `${emoji.length}ch` }} value={emoji} name="emoji" onChange={(e) => handleInputChange(e)} maxLength={11}/>
                <div className="shortcut-div">
                    <span>:</span><input className="action-inputs shortcut-input" style={{ width: `${shortcut.length}ch` }} value={shortcut} name="shortcut" onChange={(e) => handleInputChange(e)} maxLength={11}/><span>:</span>
                </div>
                {
                    isError && <p className="error">{error}</p>
                }
            </div>
            <div className="action-modal-buttons">
                <button className="modal-button" onClick={closeModal}>Cancel</button>
                <button className="modal-button" onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
}