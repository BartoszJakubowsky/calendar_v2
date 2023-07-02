import { useState } from "react"
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import LoadingIcon from "@/components/ui/LoadingIcon";
import { useNavigate } from "react-router-dom";

import { lazyWithPreload } from "react-lazy-with-preload";

const CalendarPage = lazyWithPreload(()=> import('@/pages/Calendar/CalendarPage'));

export default function CalendarCard({calendar}) {


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        setLoading(true);
        await CalendarPage.preload().then(setTimeout(() => {
            // navigate(`/kalendarz/${calendar.name}`);
            navigate(`/kalendarz`);
        }, 500))
    }




    return (
        <div 
        onClick={handleClick}
        className={` ${loading? 'scale-105 active:scale-105' : ''} overflow-hidden w-40 h-64 rounded-md border custom-border-accentMediumStrong select-none m-2 transition-all active:scale-110 hover:scale-105 hover:shadow-bottom-right duration-200 ease-in-out hover:shadow-accentMedium dark:hover:shadow-dark-accentMedium cursor-pointer`}>
            <h3 className="sticky top-0 z-[1] w-full h-16 pt-4 text-baseColor text-sm font-semibold rounded-t-md background-accentMediumStrong text-center ">
                {calendar.name}
            </h3>            <section className="no-scrollbar relative h-full custom-text-baseColor break-words text-sm p-2 overflow-auto background-border">
                <span className={` ${loading? 'opacity-0' : ''} duration-150 transition-all`}>
                    {calendar.description}
                </span>
                {loading? 
                <AnimatedContainer animation='reverseCurtainVariant' className='absolute inset-0 background-accentMediumStrong' >
                    <LoadingIcon theme='fill-baseColor'/>
                </AnimatedContainer> 
                    : false}
            </section>
        </div>
    )
}
    