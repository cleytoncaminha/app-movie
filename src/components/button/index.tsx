import { IButton } from "../../interface/interface"
import "./button.css"

export const Button = (props:IButton) =>{
    return (
    <div className="buttonContainer">
        <button className="button" onClick={props.onClick}>{props.value}</button>
    </div>
    )
}