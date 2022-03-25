import "./button.css"

interface IButton{
    value: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = (props:IButton) =>{
    return (
    <div className="buttonContainer">
        <button className="button" onClick={props.onClick}>{props.value}</button>
    </div>
    )
}