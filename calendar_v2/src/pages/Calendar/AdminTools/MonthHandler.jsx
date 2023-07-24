import { useEffect, useState } from "react"
import SelectOptions from '@/components/forms/SelectOptions'
import Accordion from '@/components/containers/Accordion';
import {translateCalendarPage} from "@/locales/translate"

export default function MonthHandler({month, index ,translate, days, children, calendar, setCalendar}) {

    const [bannedDays, setBannedDays] = useState(month.bannedDays? month.bannedDays : [])
    
    const handleCalendarUpdate = () =>
    {

        const updatedMonths = calendar.months.map((month, monthIndex) =>
        {
            if (index === monthIndex)
                return {...month, bannedDays}
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
            labelClassName = 'text-sm'
            >
                <SelectOptions
                selectedOptions={bannedDays}
                setSelectedOptions={setBannedDays}
                optionsArr={days}
                labelText={false}
                translateOption={translateCalendarPage}
                />
            </Accordion>
            {children}
        </>
    )
}
