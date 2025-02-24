
import LabelForm, { LabelFormProps } from '../LabelForm/LabelForm';
import InputForm, { InputFormProps } from '../InputForm/InputForm';

export interface GroupFormProps {
    label: LabelFormProps,
    input: InputFormProps
}

function GroupForm({ label, input }: GroupFormProps) {
    return (
        <div className="form-group">
            { label && (
                <LabelForm value={label.value} forValue={label.forValue} />
            )}
            { input && (
                <InputForm 
                    type={input.type} 
                    name={input.name} 
                    placeholder={input.placeholder} 
                    required={input.required} 
                    id={input.id} 
                    value={input.value} 
                    onChange={input.onChange} 
                />
            )}
        </div>
    )
}

export default GroupForm