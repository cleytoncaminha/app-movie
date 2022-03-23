export const Button = (props:any) =>{
    return (
    <div>
        <div onClick={props.onClick}>{props.value}</div>
    </div>
    )
}