import "./ActionButton.css"
import { PlusIcon } from '@heroicons/react/24/solid'

export const ActionButton = () => {
    return (
        <div className="action-button-container" id="container">
            <div className="action-button-content">
                <PlusIcon className="action-button-icon"/>
                <h2 className="action-button-title">Add Emoji</h2>
            </div>
        </div>
    )
}