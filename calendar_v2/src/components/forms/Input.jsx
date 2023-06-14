/* eslint-disable react/prop-types */

import { useState } from 'react';


/**
 * Highly customizable carousel 
 * @example
 * const inputType = 'email' | 'password' 'text'
 * const value = state
 * const setValue = setState
 * const valueErrorLogic = mail.length <= 5 ... 
 * const autoComplete = false | 'on'
 * const labelColor, labelClassName  = tailwindcss
 * const labelTest = add text from 'i18next
 * )
 */



export default function Input({inputType, inputClassName, value, setValue, valueErrorLogic , autoComplete, labelColor, labelClassName, labelText}) 
{

    const [valueError, setValueError] = useState(false);

    const checkValueError = () => {
        return valueErrorLogic(valueError);
    }

    const handleValueChange = (event) => 
    {   
        if (valueError && checkValueError())
            setValueError(false);
        
        setValue(event.target.value);
    }
    // <div>start {t('start')}</div>



    return (
        <div className="mb-2">
        <label className={`block text-sm font-semibold  ${valueError? 'valid text-red-300 duration-75' : labelColor? labelColor: 'text-gray-800 dark:text-slate-100 duration-300'} ${labelClassName}`}>
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
