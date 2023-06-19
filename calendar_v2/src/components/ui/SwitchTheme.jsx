import { useMemo, useState } from "react";
import Switch from "./Switch";

export default function SwitchTheme({...rest}) {
 
    
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system' );
    const htmlDocument = document.documentElement;
    //true = dark
    const handleTheme = (switchTheme) => {

      console.log(switchTheme);
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
          <Switch className={rest.className} onClick={handleTheme} initial={theme === 'black'}/>
    )
}
