import { translateCalendarPage } from "@/locales/translate";


export default function TableHeader({data, bannedData, ...rest}) {

    
    const th = data.map((data, index) =>
        {

            if (bannedData.includes(data.name.toUpperCase()))
                return false;

            return (
                <th key={data.id} className={rest.className}>
                    {translateCalendarPage(data.name)}
                </th>
            )
        })

    return (
        <tr className="border-b-2 border-slate-700">
            <th className={`${rest.className } sticky left-0 bg-red-200`}>
                {translateCalendarPage("time")}
            </th>
            {th}
        </tr>
    )
   

}
