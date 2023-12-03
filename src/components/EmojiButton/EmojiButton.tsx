import { FC } from "react"
import { Props } from "./types"
import "./EmojiButton.css"
import { XMarkIcon } from '@heroicons/react/24/solid'


export const EmojiButton: FC<Props> = ( {emoji, name, delimiter} ) => {
    return(
        <div>
            <div className="emoji-button-container">
            <div className="x">
                <XMarkIcon className="trash-icon"/>
            </div>
            <div className="emoji-button-content">
                <p className="emoji-button-icon">{emoji}</p>
                <h2 className="emoji-button-title">{delimiter} {name} {delimiter}</h2>
            </div>
        </div>
        </div>
    )
}