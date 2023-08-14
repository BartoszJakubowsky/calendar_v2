import {mainPaths, adminPaths, userPaths} from '@/routes/Router';
import useAuthentication from "@/hooks/useAuthentication";
import SwitchTheme from '@/components/ui/SwitchTheme';

import {getAllData} from '@/api/admin/adminApi'
import {getCalendars} from '@/api/calendars/calendarsApi'

import Section from './sliderContext/Section';
import Link from './sliderContext/Link';
import Ping from '@/components/ui/Ping'
import { useMemo, useState } from 'react';

export default function Slider({isOpen, setIsOpen, theme}) 
{

    const {isAdmin} = useAuthentication();
    const handleClick = () => setIsOpen(false);
    const [data, setData] = useState(null);

    useMemo(() => {
        if (isAdmin) 
            getAllData().then(result => setData(result))
        else
            getCalendars().then(result => setData({calendars: result}))
    },[])


    const mainLinks = mainPaths.map(path => {

        if (path.name == 'main')
            return [<Link key={path.name} path={path} onClick={handleClick}/>]
        
        const calendars = data?.calendars

        if (!calendars || calendars.length == 0)
            return false;
        return calendars.map(calendar => {
                const calendarPath = path.path + '/' + calendar.name.replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const newPath = {name: calendar.name, path: calendarPath}
                return <Link key={path.name} path={newPath} onClick={handleClick}/>
            })
        })
    const userLinks = userPaths.map(path => <Link key={path.name} path={path} onClick={handleClick}/>)
    const adminLinks = isAdmin? adminPaths.map((path, index) => {
            if (!data)
                return <Link key={path.name} path={path} onClick={handleClick}/>
                
            const {usersRegister, usersPassword} = data;
            const ping = () => {
            if (usersRegister.length != 0 || usersPassword.length != 0) 
                return true
            return false
            }
        if (index === 1)
        return <Link key={path.name} path={path} onClick={handleClick}/>
        else
        return <Link key={path.name} path={path} onClick={handleClick}>
                    {ping && <Ping/>}
                </Link>
    }) : false;

    return (
        <nav 
            className={`${theme? theme : 'background-gradient'} 
                top-0 left-0 absolute z-30
                md:w-[40vw] p-10 w-full h-full md:pl-10 
                overflow-auto no-scrollbar
                ease-in-out duration-300 transition-all
                ${isOpen ? "translate-x-0 " : "-translate-x-full"}`}>        
            <SwitchTheme className=' absolute right-8 top-4 scale-90'/>
            <Section header='menu' links={mainLinks}/>
            <Section header='user' links={userLinks}/>
  {isAdmin? <Section header='admin' links={adminLinks}/> : false}
        </nav>
)
}