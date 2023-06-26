/* eslint-disable react/prop-types */

export default function LabelInput({inputType, value, setValue, error, setError , autoComplete = 'on', labelColor, labelText, inputContainerClassName}) 
{

    const handleValueChange = (event) => 
    {   
        if (error)
            setError(false);
        
        setValue(event.target.value);
    }

    return (
        <div className={`${inputContainerClassName}`}>
        <label className={`block text-sm font-semibold ${error? 'valid text-red-300 duration-75' : labelColor? labelColor: ' text-form-input dark:text-slate-100 duration-300'} `}>
            {labelText}
        </label>
        <input
            type={inputType}
            className={`peer block rounded-md w-full px-4 py-2 mt-2 border inputText`}
            onChange={handleValueChange}
            onBlur={handleValueChange}
            value={value}
            required 
            autoComplete={autoComplete}
        />
    </div>
    );   
}
