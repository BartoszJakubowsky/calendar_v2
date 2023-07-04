import { useMemo, useState } from "react";
import Switch from "./Switch";
import { IoIosSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";

export default function SwitchTheme({...rest}) {
 
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system' );
    const htmlDocument = document.documentElement;
    //true = dark
    const handleTheme = (switchTheme) => {

        if (switchTheme)
            setTheme('dark');
        else
            setTheme('light');
    }
    useMemo(()=>
    {
      switch(theme)
      {
        case 'dark':
          htmlDocument.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          break;
        case 'light':
          htmlDocument.classList.remove('dark');
          localStorage.removeItem('theme');
          break;
        default:
          localStorage.removeItem('theme');
          break;
  
      }
    }, [theme])
    return (
            <Switch className={rest.className} onClick={handleTheme} initial={theme === 'dark'}>
                <IoIosSunny className="absolute left-3 text-yellow-200 dark:text-yellow-500"/>            
                <IoMdMoon className="absolute right-3 text-dark dark:text-white"/>
            </Switch>
    )
}
