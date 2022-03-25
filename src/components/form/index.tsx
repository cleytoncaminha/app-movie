import { IForm } from "../../interface/interface"
import "./form.css"


export const Form = (props:IForm) => {
    return (
            <form>
                <div className="containerForm">
                    <input type="text" name="search" id="search" onChange={props.onChange} value={props.value} placeholder="Buscar filmes" />
                </div>
            </form>     
    )
}