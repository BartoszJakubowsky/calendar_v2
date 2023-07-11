import LabelInput from "@/components/forms/LabelInput";


export default function CalendarDescription({value, setValue, labelText, error, setError}) {
    
    return (
        <LabelInput 
                    inputContainerClassName={"mb-2 mt-2"}
                    inputType='textarea' 
                    value={value}
                    setValue={setValue}
                    setError={setError}
                    error={error}
                    labelText={labelText}
        />
    )
}
