
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import LoadingMessage from '@/components/ui/LoadingMessage';
import { useEffect, useState } from 'react';
import {getUser} from '@/api/authentication/authenticationApi'
import useAuthentication from '@/hooks/useAuthentication';
import {AnimatePresence} from 'framer-motion';
import MenuPage from '@/pages/menu/MenuPage';

export default function AccountPage() {

const [fetchingData, setFetchingData] = useState(true);
const [error, setError] = useState(false);
const [records, setRecords] = useState(false);
const {user}= useAuthentication()
useEffect(()=> {
    getUser(user._id).then(response => {
        setFetchingData(false);
        if (!response)
            setError(true);
        else
            setRecords(user.records)
    })
},[])
console.log(records);
 return (
    <AnimatedContainer className = 'h-screen background flex justify-center items-start ' animation='opacityVariant'>
        <MenuPage/>
        <AnimatePresence mode='wait'>
        {fetchingData 
        ? <LoadingMessage message='Wait for data' theme='text-accentStrong dark:text-dark-accentStrong'/>
        : <AnimatedContainer 
        className='flex relative mt-14 shadow-md w-11/12 md:w-2/3 border-2 border-accentStrong dark:border-dark-accentStrong rounded-sm p-2 bg-accentMedium dark:bg-dark-accentMedium' 
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


const Record = (record) => {

    return (
        <div className='h-10'>

        </div>

    )
}