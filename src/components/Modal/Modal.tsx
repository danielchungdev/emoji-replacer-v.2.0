import "./Modal.css"
import { FC } from "react"
import { Props } from "./types"

export const Modal: FC<Props> = ({ open, children, close }) => {

    if (open){
        document.body.style.overflow = 'hidden';
    }
    else{
        document.body.style.overflow = 'unset';
    }

    return (
        <div className={`${open ? "modal-container-open" : "modal-container-close"}`}>
            <div className="modal-backdrop" onClick={close}>
                {children}
            </div>
        </div>
    )
}