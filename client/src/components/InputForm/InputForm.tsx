export interface InputFormProps {
    id?: string;
    type: string;
    name?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputForm({ id, type, name, value, placeholder, required, onChange }: InputFormProps) {
    return (
        <input 
            id={id} 
            type={type} 
            name={name} 
            value={value} 
            placeholder={placeholder} 
            required={required} 
            onChange={onChange} 
        />
    );
}

export default InputForm;
