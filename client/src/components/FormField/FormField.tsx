import { Label } from "../ui/label";
import { Input } from "../ui/input";

export interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({ id, label, type, name, value, placeholder, required, onChange }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id} className="text-right">
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className="col-span-3"
            />
        </div>
    );
}

export default FormField;
