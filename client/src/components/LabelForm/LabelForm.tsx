
export interface LabelFormProps {
    value: string,
    forValue: string
}

function LabelForm({ value, forValue }: LabelFormProps) {
    return (
        <label htmlFor={forValue}>{value}</label>
    )
}


export default LabelForm