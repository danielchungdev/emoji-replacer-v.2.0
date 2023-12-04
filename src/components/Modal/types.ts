import { MouseEventHandler } from "react"

export interface Props{
    open: boolean, 
    children: JSX.Element
    close: MouseEventHandler<HTMLDivElement>
}