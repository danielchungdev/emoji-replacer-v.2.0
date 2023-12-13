import { FC, ChangeEvent } from "react"
import { Props } from "./types"
import "./EmojiButton.css"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from "react"
import { useOpen } from "@hooks/useOpen"

export const EmojiButton: FC<Props> = ({ id, emoji, name, delimiter, refetch }) => {

    const { isOpen: editMode, open, close } = useOpen();

    const [emojiVar, setEmojiVar] = useState<string>(emoji)
    const [nameVar, setNameVar] = useState<string>(name)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "emoji") {
            setEmojiVar(e.target.value);
        }
        if (e.target.name === "name") {
            setNameVar(e.target.value);
        }
    }

    const updateToDatabase = async() => {
        const sql = `UPDATE Emojis SET keyword = '${nameVar}', emoji = '${emojiVar}' WHERE rowid = ${id};`
        await window.ipcRenderer.invoke("db-query", sql)
        close()
    }

    const deleteToDatabase = async() => {
        const sql = `DELETE FROM Emojis WHERE rowid = ${id}`
        await window.ipcRenderer.invoke("db-query", sql)
        close()
        refetch()
    }

    return (
        <div key={id} onClick={editMode ? undefined : open}>
            <div className={`emoji-button-container ${editMode && "emoji-edit-mode"}`}>
                {
                    editMode && (<div className="x" onClick={deleteToDatabase}>
                                    <XMarkIcon className="trash-icon" />
                                </div>)
                }
                { editMode && <h2 className="emoji-edit-title">Edit</h2>}
                <div className="emoji-button-content">
                    { editMode ? <input className="emoji-button-edit-mode unique-input" onChange={handleInputChange} name="emoji" style={{ width: `${emojiVar.length}ch` }} value={emojiVar} maxLength={11}/> : <p className="emoji-button-icon">{emojiVar}</p>}
                    { editMode ?
                                <div className="emoji-name-edit">
                                    <span>:</span>
                                        <input className="emoji-button-edit-mode name-input" onChange={handleInputChange} name="name" style={{ width: `${nameVar.length}ch` }} value={nameVar} maxLength={11}/>
                                    <span>:</span>
                                </div> 
                                    : 
                                <h2 className="emoji-button-title">{delimiter} {nameVar} {delimiter}</h2>
                    }
                </div>
                {
                    editMode && (<div className="emoji-edit-button">
                                    <button className="modal-button" onClick={close}>Cancel</button>
                                    <button className="modal-button" onClick={updateToDatabase}>Save</button>
                                </div>)
                }
            </div>
        </div>
    )
}