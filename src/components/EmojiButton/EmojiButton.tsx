import { FC, ChangeEvent } from "react"
import { Props } from "./types"
import "./EmojiButton.css"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from "react"
import { useOpen } from "@hooks/useOpen"
import { isAnError } from "@helpers/isAnError"
import { useError } from "@hooks/useError"
import { Errors } from "@enums/Errors"
import { useDatabase } from "@hooks/useDatabase"

export const EmojiButton: FC<Props> = ({ id, emoji, name, delimiter, refetch }) => {

    const { isOpen: editMode, open, close } = useOpen();

    const [emojiVar, setEmojiVar] = useState<string>(emoji)
    const [shortcut, setShortcut] = useState<string>(name)

    const [oldValues] = useState({
        shortcut: name,
        emoji: emoji
    })

    const { isError, error, defineError, clearError } = useError()
    const { updateToDatabase } = useDatabase()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "emoji") {
            setEmojiVar(e.target.value);
        }
        if (e.target.name === "name") {
            setShortcut(e.target.value);
        }
    }

    //TODO: figure out why when moving this to a hook crashes the app.
    const deleteToDatabase = async () => {
        const sql = `DELETE FROM Emojis WHERE id = ${id}`
        let res = await window.ipcRenderer.invoke("db-query", sql)
        if (isAnError(typeof res)) {
            defineError(Errors.SQLITE_BUSY)
        }
        refetch()
        handleUpdateClose()
    }

    const restoreDefaults = () => {
        setEmojiVar(oldValues.emoji)
        setShortcut(oldValues.shortcut)
    }

    const handleUpdateDB = () =>{
        updateToDatabase(shortcut, emojiVar, clearError, defineError, handleUpdateClose, id, refetch, restoreDefaults)
    }

    const handleUpdateClose = () => {
        restoreDefaults()
        clearError()
        close()
    }

    return (
        <div className={`emoji-button-container ${editMode && "emoji-edit-mode"}`} onClick={editMode ? undefined : open}>
            {
                editMode && (<div className="x" onClick={deleteToDatabase}>
                    <XMarkIcon className="trash-icon" />
                </div>)
            }
            {editMode && <h2 className="emoji-edit-title">Edit</h2>}
            <div className="emoji-button-content">
                {editMode ? <input className="emoji-button-edit-mode unique-input" onChange={handleInputChange} name="emoji" style={{ width: `${emojiVar.length}ch` }} value={emojiVar} maxLength={11} /> : <p className="emoji-button-icon">{emojiVar}</p>}
                {editMode ?
                    <div className="emoji-name-edit">
                        <span>:</span>
                        <input className="emoji-button-edit-mode name-input" onChange={handleInputChange} name="name" style={{ width: `${shortcut.length}ch` }} value={shortcut} maxLength={11} />
                        <span>:</span>
                    </div>
                    :
                    <h2 className="emoji-button-title">{delimiter} {shortcut} {delimiter}</h2>
                }
                {isError && <p className="error">{error}</p>}
            </div>
            {
                editMode && (<div className="emoji-edit-button">
                    <button className="modal-button" onClick={handleUpdateClose}>Cancel</button>
                    <button className="modal-button" onClick={handleUpdateDB}>Save</button>
                </div>)
            }
        </div>
    )
}