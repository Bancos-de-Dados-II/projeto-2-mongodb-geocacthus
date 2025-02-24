import GroupForm, { GroupFormProps } from "../GroupForm/GroupForm";
import InputForm from "../InputForm/InputForm";

interface FormAccountProps {
    groups: GroupFormProps[],
    typeButton: string,
    valueButtom: string
}

function FormAccount({ groups, typeButton, valueButtom }: FormAccountProps) {
    return (
        <>
            {groups.map((grup, index) => {
                return <GroupForm key={index} label={grup.label} input={grup.input}/>
            })}
            <div id="form-group-button" className="form-group">
                <InputForm id="singin-button" type={typeButton} value={valueButtom} />
            </div>
        </>
    )
}

export default FormAccount