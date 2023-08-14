import { NavLink } from "react-router-dom";
import {translateMenu} from "@/locales/translate";

export default function Link({path, children}) {

    const activeClassName = 'text-black text-lg font-semibold border-l-2 border-black pl-1';
    const normalClassName = 'text-lg pl-2 text-slate-100 custom-text-baseColor hover:text-white duration-150 ';

    const translateText = (text) => 
    {
        return translateMenu(text);
    }
    return (
        <li className="relative w-fit pr-1">
            <NavLink 
                to={path.path} 
                className={(navData) => (navData.isActive ? activeClassName : normalClassName)}>{translateText(path.name).includes('.')? path.name: translateText(path.name)}
            </NavLink>
            {children}
        </li>   
    ); 
}
