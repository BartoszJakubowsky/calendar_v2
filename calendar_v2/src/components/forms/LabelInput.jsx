/* eslint-disable react/prop-types */

import { useState } from 'react';

export default function LabelInput({inputType, inputClassName, value, setValue, valueErrorLogic , autoComplete, labelColor, labelClassName, labelText, inputContainerClassName}) 
{

    const [valueError, setValueError] = useState(false);

    const checkValueError = () => {
        if (valueErrorLogic())
            setValueError(true);
    }

    const handleValueChange = (event) => 
    {   
        if (valueError && valueError)
            setValueError(false);
        
        setValue(event.target.value);
    }

    return (
        <div className={`${inputContainerClassName}`}>
        <label className={`${labelClassName} ${valueError? 'valid text-red-300 duration-75' : labelColor? labelColor: 'text-gray-800 dark:text-slate-100 duration-300'} `}>
            {labelText}
        </label>
        <input
            type={inputType}
            className={inputClassName}
            onChange={handleValueChange}
            onBlur={handleValueChange}
            value={value}
            required 
            autoComplete={autoComplete}
        />
    </div>
    );   
}
