import { useEffect } from "react"
import { motion as m } from "framer-motion";
import {useSprings, animated} from 'react-spring';
import axios from "axios";


import Menu from '../../components/menu/Menu';
import Users from "./Users";
import UsersPassword from "./UsersPassword";
import UsersRegister from "./UsersRegister";
import Calendars from "./Calendars";
import AdminPageNav from "./AdminPageNav";
import LoadingIcon from "../../components/ui/LoadingIcon";

import { useState } from 'react';
import Message from "../../components/ui/Message";
import Confirm from "../../components/ui/Confirm";
import useCalendars from "../../hooks/useCalendars";


export default function AdminPage() 
{
    const [display, setDisplay] = useState(0);
    const [getData, setGetData] = useState(false);
    const [users, setUsers] = useState(false);
    const [usersPassword, setUsersPassword] = useState(false);
    const [usersRegister, setUsersRegister] = useState(false);

    const {confirm, setConvirm, message, setMessage} = useCalendars();
    
    useEffect(()=>
    {
      axios.get('/data/all', ).then(response => 
      {
        
          setTimeout(() => 
          {
            const {user, userRegister, userPassword} = response.data;    
            setUsers(user);
            setUsersPassword(userPassword);
            setUsersRegister(userRegister);
            setGetData(true)
          }, 1000);
          


      }).catch(err => console.log('Błąd podczas pobierania danych', err))

    }, [])

    

    const updateAll = (data) =>
    {
            const {user, userRegister, userPassword} = data;      
            setUsers(user);
            setUsersPassword(userPassword);
            setUsersRegister(userRegister);
    }

    const pagesToShow = 
    [    
        <Users items={users} setMessage={setMessage} setConvirm={setConvirm} updateAll={updateAll}/>,
        <UsersPassword items={usersPassword} setMessage={setMessage} updateAll={updateAll} setConvirm={setConvirm}/>,
        <UsersRegister items={usersRegister} setMessage={setMessage} updateAll={updateAll} setConvirm={setConvirm}/>,
        <Calendars setMessage={setMessage}/>
    ]
    const pagesCount = pagesToShow.length;
    

    


    const springs = useSprings(
        pagesCount,
        pagesToShow.map((form, index) => ({
        transform: `translateX(${(index - display) * 100}%)`,
        position: 'absolute',
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        }))
    );
    const variantsForAdminPage = 
    {
          hidden: { opacity: 0, x: -200, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: -100, transition:{delay: 1} },
    }

    const variantsForSuspense = 
                  {
                        hidden: { opacity: 0, x: -200, y: 0 },
                        enter: { opacity: 1, x: 0, y: 0 },
                        exit: { opacity: 0, x: 0, y: -100 },
                  }


                  

    if (!getData)
    return (
      <m.div className='w-screen h-screen justify-center items-center flex' variants={variantsForSuspense} initial='hidden' animate='enter' transition={{type: 'linear'}} exit={{x: 200, transition: 0.2 }}>
        <LoadingIcon classname={' fill-blue-500'}></LoadingIcon>
      </m.div>
    )
    return (<>
    <Menu className='flex' theme={'bg-slate-400'}/>
    <Confirm message={confirm.message} submit={confirm.submit} additional={confirm.additional} handleSubmit={confirm.handleSubmit}/>
    <m.div className="flex w-screen h-screen overflow-hidden  justify-center items-start" variants={variantsForAdminPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
    <Message message={message}/>
    {/* <Confirm message={convirm.message || false} submit={convirm.submit || false} handleSubmit={convirm.handleSubmit || false}/> */}
      <div className="mt-12 h-full overflow-hidden text-xs w-11/12 md:text-base md:w-3/4 md:1/2">
                <AdminPageNav display={display} setDisplay={setDisplay} users={users} usersPassword={usersPassword} usersRegister={usersRegister}/>
            <div className="relative w-full h-[80%] overflow-hidden z-10">
            
            {pagesToShow[display]}

            </div>
        </div>
    </m.div>
    </>)
}