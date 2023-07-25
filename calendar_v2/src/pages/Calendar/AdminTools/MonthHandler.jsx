import { useEffect, useRef, useState } from "react"
import SelectOptions from '@/components/forms/SelectOptions'
import Accordion from '@/components/containers/Accordion';
import {translateCalendarPage} from "@/locales/translate"
import LabelInput from '@/components/forms/LabelInput';

export default function MonthHandler({month, index ,translate, days, children, calendar, setCalendar}) {

    const [bannedDays, setBannedDays] = useState(month.bannedDays? month.bannedDays : [])
    const isMounted = useRef(false);
    const [remove, setRemove] = useState(false);

    useEffect(()=>
    {
        if(!isMounted.current)
        {
            isMounted.current = true;
            return;
        }

        handleCalendarUpdate();

    }, [bannedDays, remove])
    const handleCalendarUpdate = () =>
    {

        const updatedMonths = calendar.months.map((month, monthIndex) =>
        {
            if (index === monthIndex)
                return {...month, bannedDays, remove}
            else
                return month;
        })

       const updatedCalendar = {
        ...calendar,
        months : updatedMonths
       }

       setCalendar(updatedCalendar)
    }
    
    return (
        <>
            <Accordion
            label={translate('bannedDaysLabel')}
            labelClassName = 'text-sm ml-2'
            >
                <SelectOptions
                selectedOptions={bannedDays}
                setSelectedOptions={setBannedDays}
                optionsArr={days}
                labelText={false}
                translateOption={translateCalendarPage}
                />
            </Accordion>
            <div className="flex flex-row items-center justify-center">
                    <h5>{translate('removeMonth')}</h5>
                    <LabelInput value={remove} setValue={()=>setRemove(!remove)} inputType={'checkbox'}/>
            </div>
            {children}
        </>
    )
}
