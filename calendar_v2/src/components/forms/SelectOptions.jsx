export default function SelectOptions({selectedOptions, setSelectedOptions, selectedOptionsError, setOptionsError,  optionsArr, labelText, translateOption, translateSettings, ...rest}) {

    const handleOptionClick = index =>
    {
        if (selectedOptionsError)
            setOptionsError(false);

        const chosenOption = optionsArr[index].toUpperCase();
        if (selectedOptions.includes(chosenOption))
            setSelectedOptions(selectedOptions.filter(option => {return option !== chosenOption}))
        else
            setSelectedOptions([...selectedOptions, chosenOption])
    }

    const renderDays = optionsArr.map((option, index)=>
        {

            return (
            <li 
                onClick={() => handleOptionClick(index)}
                className={`text-sm uppercase text-center px-1 py-2 m-1 cursor-pointer duration-150 active:scale-110
                ${selectedOptions.includes(option.toUpperCase())? 'option-on text-baseColor' : 'option-off text-dark-baseColor'}`}
                key={option}
                >{translateSettings ? translateOption(translateSettings(option)) : translateOption(option)}</li>)
        })

    return (
        <div className={rest.className}>
        <label className={`block text-sm font-semibold ${selectedOptionsError? 'valid text-red-300 duration-75' : ' custom-text-baseColor duration-300'} `}>
            {labelText}
        </label>
        <div className="flex flex-col">
        <ul className="flex flex-row justify-start w-full  overflow-x-scroll no-scroll md:overflow-x-auto">
            {renderDays}
        </ul>
        </div>
        </div>
    )
}
