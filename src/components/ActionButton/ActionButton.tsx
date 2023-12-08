import { FC } from "react"
import "./ActionButton.css"
import { PlusIcon } from '@heroicons/react/24/solid'
import { Props } from "@components/ActionButton/types"

export const ActionButton: FC<Props> = ({ onClick }) => {

    return (
        <>
            <div className="action-button-container" id="container" onClick={onClick} tabIndex={0}>
                <div className="action-button-content">
                    <PlusIcon className="action-button-icon" />
                    <h2 className="action-button-title">Add Emoji</h2>
                </div>
            </div>
        </>
    )
}