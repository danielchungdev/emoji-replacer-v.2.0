import "./Navbar.css"
import { Cog8ToothIcon } from "@heroicons/react/24/solid"

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="options-outer-bar">
                <Cog8ToothIcon className="navbar-option" />
            </div>
        </div>
    )
}