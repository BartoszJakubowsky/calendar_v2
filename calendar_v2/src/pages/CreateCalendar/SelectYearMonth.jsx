import { useMemo, useState } from "react";
import { IoIosArrowForward as ArrowRight} from "react-icons/io";
import { IoIosArrowBack as ArrowLeft } from "react-icons/io";
import SelectOptions from "@/components/forms/SelectOptions";
import Label from '@/components/forms/Label';
export default function SelectYearMonth({labelText, selectedMonths, setSelectedMonths, selectedMonthsError, setSelectedMonthsError, translateOption}) {
 
    

    const actualYear = new Date().getFullYear()
    const [year, setYear] = useState(actualYear)

    const handleYear = (newYear) => setYear(newYear);
    const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
    ]

    const convertMonths = months => months.map(month => year.toString() + "." + month);
    const availableMonths = useMemo(()=>
    {
        if (year === actualYear)
    {
        const actualMonth = new Date().getMonth();
        return convertMonths(months.slice(actualMonth));
    }
    else
        return convertMonths(months);
    },[year])
    
    const translateSettings = (text) => text.split('.').pop();

        const leftArrowClassName = 'hover:-translate-x-0.5 transition active:hover:-translate-x-1';
        const rightArrowClassName = 'hover:translate-x-0.5 transition active:hover:translate-x-1';
        const arrowClassName = 'custom-text-dark-baseColor cursor-pointer text-lg ease-out';

        return (
            <div className="flex flex-col my-4">
                <Label text={labelText} error={selectedMonthsError} />
                    <div className="flex flex-row items-center">
                        {((year === actualYear) && <ArrowLeft className=" pointer-events-none opacity-30"/> ) || 
                        <ArrowLeft className={`${arrowClassName} ${leftArrowClassName}`} onClick={()=>handleYear(year-1)}/>}
                        <span className=" text-sm font-semibold custom-text-dark-baseColor pointer-events-none">{year}</span>
                        <ArrowRight className={`${arrowClassName} ${rightArrowClassName}`} onClick={()=>handleYear(year+1)}/>
                        </div>
                <SelectOptions
                    selectedOptions={selectedMonths}
                    setSelectedOptions={setSelectedMonths}
                    selectedOptionsError={selectedMonthsError}
                    setOptionsError={setSelectedMonthsError}
                    optionsArr={availableMonths}
                    translateOption={translateOption}
                    translateSettings={translateSettings}
                    />
            </div>
            )
}
