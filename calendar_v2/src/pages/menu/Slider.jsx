
import {mainPaths, adminPaths, userPaths} from '@/routes/Router';
import useAuthentication from "@/hooks/useAuthentication";

import Section from './sliderContext/Section';
import Link from './sliderContext/Link';


export default function Slider({isOpen, setIsOpen, theme}) 
{

    const {isAdmin} = useAuthentication();

    const handleClick = () => setIsOpen(false);

    const mainLinks = mainPaths.map(path => <Link key={path.name} path={path} onClick={handleClick}/>)
    const userLinks = userPaths.map(path => <Link key={path.name} path={path} onClick={handleClick}/>)
    const adminLinks = isAdmin? adminPaths.map(path => <Link key={path.name} path={path} onClick={handleClick}/>) : false;

    return (
        <nav 
            className={`${theme? theme : 'background-gradient'} 
                top-0 left-0 absolute z-30
                md:w-[40vw] p-10 w-full h-full md:pl-10 
                overflow-auto no-scrollbar
                ease-in-out duration-300 transition-all
                ${isOpen ? "translate-x-0 " : "-translate-x-full"}`}>        
            <Section header='menu' links={mainLinks}/>
            <Section header='user' links={userLinks}/>
  {isAdmin? <Section header='admin' links={adminLinks}/> : false}
        </nav>
)
}