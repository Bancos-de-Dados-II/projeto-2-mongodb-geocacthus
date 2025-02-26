import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export interface FormSelectProps {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    required?: boolean;
}

function FormSelect({ id, label, placeholder, value, options, onChange, required }: FormSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id} className="text-right">
                {label}
            </Label>
            <Select value={value} onValueChange={onChange} required={required}>
                <SelectTrigger id={id} aria-label={label}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default FormSelect;
