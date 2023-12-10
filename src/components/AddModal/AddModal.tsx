import { useState, ChangeEvent, FC } from "react"
import "./AddModal.css"
import { Props } from "./types"

export const AddModal: FC<Props> = ({ closeModal }) => {

    const [emoji, setEmoji] = useState<string>("🔥")
    const [shortcut, setShortcut] = useState<string>("fire")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "emoji") {
            setEmoji(e.target.value)
        }
        if (e.target.name === "shortcut") {
            setShortcut(e.target.value)
        }
    }

    return (
        <div className="action-modal-content">
            <h2>Add Emoji</h2>
            <div className="input-modal">
                <input className="action-inputs emoji-input" style={{ width: `${emoji.length}ch` }} value={emoji} name="emoji" onChange={(e) => handleInputChange(e)} maxLength={11}/>
                <div className="shortcut-div">
                    <span>:</span><input className="action-inputs shortcut-input" style={{ width: `${shortcut.length}ch` }} value={shortcut} name="shortcut" onChange={(e) => handleInputChange(e)} maxLength={11}/><span>:</span>
                </div>
            </div>
            <div className="action-modal-buttons">
                <button className="modal-button" onClick={closeModal}>Cancel</button>
                <button className="modal-button" >Add</button>
            </div>
        </div>
    )
}