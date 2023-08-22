
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import LoadingMessage from '@/components/ui/LoadingMessage';
import { useEffect, useState } from 'react';
import {getUser} from '@/api/authentication/authenticationApi'
import useAuthentication from '@/hooks/useAuthentication';
import {AnimatePresence} from 'framer-motion';
import MenuPage from '@/pages/menu/MenuPage';
import {translateDaysMonths, translateAccountPage} from '@/locales/translate';

export default function AccountPage() {

const [fetchingData, setFetchingData] = useState(true);
const [error, setError] = useState(false);
const [records, setRecords] = useState(false);
const {user}= useAuthentication()
useEffect(()=> {
    getUser(user._id).then(response => {
        setFetchingData(false);
        if (!response.data)
            setError(true);
        else
        {
            setRecords(response.data)
        }
    })
},[])
 return (
    <AnimatedContainer className = 'h-screen background flex flex-row flex-wrap items-center justify-center overflow-y-scroll ' animation='opacityVariant'>
        <MenuPage/>
        <AnimatePresence mode='wait'>
        {records &&  records.length != 0 && <h1 className='w-full text-center mt-10 text-lg md:text-2xl p-2 text-accentStrong dark:text-dark-accentStrong h-10'>{translateAccountPage('mainHeader')}</h1>}
        {fetchingData 
        ? <LoadingMessage message='Wait for data' theme='text-accentStrong dark:text-dark-accentStrong'/>
        : <AnimatedContainer 
        className='flex flex-wrap gap-2 relative mt-4 md:mt-10 shadow-md w-11/12 h-fit md:w-2/3 border-2 border-accentStrong dark:border-dark-accentStrong rounded-sm p-2 bg-accentMedium dark:bg-dark-accentMedium justify-center md:justify-start' 
        animation='ySwipeVariant'>
            {error
            ? <h3>error</h3>
            : !records || records.length == 0 ? 
            <h3>No records yet!</h3>
            : records.map((record, index) => <Record key={index} record={record}/>)
            }
          </AnimatedContainer>
        }
        </AnimatePresence>
    </AnimatedContainer>
 )   
}


const Record = ({record}) => {
    return (
        <div className=' w-44 overflow-hidden h-30 md:w-60 md:h-40 bg-accentLight dark:bg-dark-accentLight p-2 border-accentStrong dark:border-dark-accentStrong border-2 flex flex-col'>
            <h3 className='md:text-lg flex-wrap  bg-accentMedium dark:bg-dark-accentMedium dark:text-baseColor rounded-sm flex justify-center items-center w-full'>{translateDaysMonths(record.dayName)}, {record.fullDate}
                <p className=' '>{translateAccountPage('time')} {record.time}</p>
            </h3>
            <p className='w-full text-center py-2 md:text-lg text-accentStrong dark:text-dark-accentStrong'>{record.calendarName}</p>
            
        </div>

    )
}