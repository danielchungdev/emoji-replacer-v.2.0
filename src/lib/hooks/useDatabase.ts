import { Errors } from "@enums/Errors"
import { isAnError } from "@helpers/isAnError"
import { EmojisObjects } from "@components/EmojiGrid/types";
import { useState } from "react";


export const useDatabase = () => {
    const [emojis, setEmojis] = useState<EmojisObjects[]>([]);

    const getEmojis = async () => {
        const rows = await window.ipcRenderer.invoke("db-query", "SELECT * FROM Emojis")
        setEmojis(rows)
    }

    const addToDatabase = async (shortcut: string, emoji: string, clearError: () => void, defineError: (err: Errors) => void, closeModal: () => void, refetch: () => void) => {
        clearError()

        if (shortcut.length < 1 || emoji.length < 1) {
            defineError(Errors.TOO_SHORT)
            return
        }

        const sql = `INSERT INTO Emojis (keyword, emoji) VALUES ('${shortcut.toLowerCase()}', '${emoji}')`
        let res = await window.ipcRenderer.invoke("db-query", sql)

        if (isAnError(typeof res)) {
            defineError(Errors.DUPLICATE)
            return;
        }
        closeModal()
        refetch()
    }

    const updateToDatabase = async (shortcut: string, emoji: string, clearError: () => void, defineError: (err: Errors) => void, close: () => void, id: number, refetch: () => void, restoreDefaults: () => void) => {
        clearError()
        if (shortcut.length < 1 || emoji.length < 1) {
            defineError(Errors.TOO_SHORT)
            restoreDefaults()
            return;
        }
        const sql = `UPDATE Emojis SET keyword = '${shortcut}', emoji = '${emoji}' WHERE id = ${id};`
        let res = await window.ipcRenderer.invoke("db-query", sql)
        console.log(res)
        if (isAnError(typeof res)) {
            defineError(Errors.DUPLICATE)
            restoreDefaults()
            return;
        }
        refetch()
        close()
    }

    const deleteToDatabase = async (id: number, defineError: (err: Errors) => void, refetch: () => void) => {
        const sql = `DELETE FROM Emojis WHERE id = ${id}`
        let res = await window.ipcRenderer.invoke("db-query", sql)
        if (isAnError(typeof res)) {
            defineError(Errors.SQLITE_BUSY)
            return;
        }
        refetch()
        close()
    }

    return { addToDatabase, updateToDatabase, deleteToDatabase, emojis, getEmojis }
    
}