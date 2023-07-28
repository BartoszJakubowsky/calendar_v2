import { useRef } from 'react';

export default function LabelInput({
  inputType,
  value,
  setValue,
  error,
  setError,
  autoComplete = 'on',
  labelColor,
  labelText,
  inputContainerClassName,
  inputClassName,
  placeHolder,
  valueList
}) {
  const checkboxRef = useRef(null); 
  const handleValueChange = (event) => {
    if (error) setError(false);

    if (inputType === 'checkbox') {
      setValue(!value);

      checkboxRef.current.blur();
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <>
    {inputType === 'list'? 
      <select 
       id='list' 
       onChange={handleValueChange}
       className={`peer block rounded-md w-full mt-2 border text-form-input ${inputContainerClassName}`}
       >
        {valueList.map((option, index)=>{
          return (
          <option 
          key={index} 
          selected={value === index}
          value={option}
          className={`${inputClassName}`}
          >{option}
          </option>)
        })}
      </select>
      :<div className={`${inputContainerClassName}`}>
      {labelText ? (
        <label
          className={`block text-sm font-semibold ${
            error
              ? 'valid text-red-300 duration-75'
              : labelColor
              ? labelColor
              : ' custom-text-baseColor duration-300'
          } `}
        >
          {labelText}
        </label>
      ) : null}
      {inputType === 'textarea' ? (
        <textarea
          className={`peer block rounded-md w-full px-4 py-2 mt-2 border text-form-input ${inputClassName}`}
          onChange={handleValueChange}
          onBlur={handleValueChange}
          value={value}
          required
          autoComplete={autoComplete}
          placeholder={placeHolder? placeHolder : ''}
        ></textarea>
      ) : (
        <input
          type={inputType}
          ref={inputType === 'checkbox' ? checkboxRef : null} 
          className={`peer block rounded-md w-full px-4 py-2 mt-2 border text-form-input ${inputClassName}`}
          onChange={handleValueChange}
          onBlur={handleValueChange}
          value={value}
          required
          autoComplete={autoComplete}
          placeholder={placeHolder? placeHolder : ''}
        ></input>
      )}
    </div>}
    </>
  );
}
