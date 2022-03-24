export const Form = (props:any) => {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="search">Procure seu filme favorito </label>
                    <input type="text" name="search" id="search" onChange={props.onChange} value={props.value} />
                </div>
            </form>
        </div>
    )
}