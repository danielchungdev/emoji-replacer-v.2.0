import { Errors } from "@enums/Errors"
import { useState } from "react"

export const useError = () => {
    const [error, setError] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)

    const clearError = () => {
        setIsError(false)
        setError("")
    }

    const defineError = (err: Errors) => {
        setIsError(true)
        if (err === Errors.DUPLICATE || err === Errors.SQLITE_CONSTRAINT){
            setError("Duplicate shortcut name.")
        }

        if (err === Errors.TOO_SHORT){
            setError("Shortcut name or emoji is too short.")
        }

        if (err === Errors.SQLITE_BUSY){
            setError("Database is busy.")
        }

    }

    return { isError, error, defineError, clearError }
}