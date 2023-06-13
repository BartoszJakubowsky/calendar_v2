import Menu from '../../components/menu/Menu';
import {motion as m} from 'framer-motion';
import useCalendars from '../../hooks/useCalendars';
import RecordHolder from './RecordsHolder';
import useAuthentication from '../../hooks/useAuthentication';
export default function UserPage() 
{

    const {calendars} = useCalendars();
    const {user} = useAuthentication();
    const variantsForSuspense = 
            {
                  hidden: { opacity: 0, x: -200, y: 0 },
                  enter: { opacity: 1, x: 0, y: 0 },
                  exit: { opacity: 0, x: 0, y: 200 },
            }



    const sortRecords = (records) =>
    {
        function filterByName(records) {
            const filteredSlots = records.filter(slot => slot.sign === user.name);
            return filteredSlots;
          }
        function sortByMonths(records) {
            const uniqueDates = Array.from(new Set(records.map(slot => slot.date)));
            const filteredSlots = [];
          
            uniqueDates.forEach(date => {
              const slotsWithSameDate = records.filter(slot => slot.date === date);
              filteredSlots.push(slotsWithSameDate);
            });
          
            return filteredSlots;
        }

        const filteredByName = filterByName(records);

        return sortByMonths(filteredByName);
    }


    const sortedCalendarsRecors = calendars.map((calendar)=>
    {
        const sorted = sortRecords(calendar.records);
        console.log(sorted);
        return (
            <div key={calendar.name} className=' flex flex-col'>
             <h3 className='h-10 bg-slate-300 text-lg font-bold border-2 border-slate-500 flex justify-center items-center sticky top-0 z-[2]'>{calendar.name}</h3>   
             {sorted.map((month, index)=>
             {
                return <RecordHolder key={index} month={month}/>
             })}
            </div>
        )
    })
    return (
        <>
        <Menu className='flex' theme={'bg-slate-400'}/>
        <m.div className='w-screen h-screen justify-center overflow-hidden flex bg-zinc-100' variants={variantsForSuspense} initial='hidden' animate='enter'  exit='exit'>
            <div className='md:w-3/4 w-11/12 md:mt-10 mt-14 flex flex-col overflow-y-scroll md:overflow-auto'>
                {sortedCalendarsRecors}
            </div>
        </m.div>
        </>
    )    
}