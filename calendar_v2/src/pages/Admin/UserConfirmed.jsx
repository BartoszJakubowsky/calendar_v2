import LabelInput from '@/components/forms/LabelInput';
import Accordion from '@/components/containers/Accordion'
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import { useState } from 'react';
export default function UserConfirmed({users, setUsers}) {

    const [search, setSearch] = useState('');

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));


    return (
        <AnimatedContainer className={'w-full h-full relative'} animation={'ySwipeVariant'}>

            <LabelInput 
            labelText={'Znajdź użytkownika'} 
            value={search} 
            setValue={setSearch} 
            inputType={'text'} 
            inputContainerClassName=' mb-2 mt-2 bg-accentMedium p-2 rounded-md'
            />
            {filteredUsers.map(user=> {
                return (
                    <Accordion
                    key={user.id}
                    label={user.name}
                    labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2  cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium`}
                    contentClassName={`bg-accentMedium dark:bg-dark-accentMedium rounded-b-sm p-4 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
                    >
                        {user.name}
                        {user.id}
                    </Accordion>
                )
            })}
        </AnimatedContainer>
    )
}