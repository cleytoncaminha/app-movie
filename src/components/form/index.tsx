import { IForm } from "../../interface/interface"
import "./form.css"


export const Form = (props:IForm) => {
    return (
        <div className="containerForm">

            <form>
                <div>
                    <input type="text" name="search" id="search" onChange={props.onChange} value={props.value} placeholder="Buscar filmes" />
                </div>
            </form>
        </div>
    )
}