export type InputProps ={
    labelText:string,
    name:string,
    id:string,
    labelFor:string,
    type:string,
    isRequired:boolean,
    placeholderText:string,
    customClass?:string,
    handleChange:React.ChangeEventHandler<HTMLInputElement>
    value:string
    autoFocus?:boolean
}