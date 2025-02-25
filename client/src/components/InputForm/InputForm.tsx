
export interface InputFormProps {
    id?: string,
    type: string,
    name?: string,
    value?: string,
    placeholder?: string,
    required?: boolean
}

function InputForm({ type, name, placeholder, required, id, value }: InputFormProps) {
    return (
        <input id={id} type={type} name={name} placeholder={placeholder} required={required} value={value} />
    )
}

export default InputForm