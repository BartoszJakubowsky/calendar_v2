import Switch from '@/components/ui/Switch'
import Label from '@/components/forms/Label'
import {IoIosCheckmark as On, IoIosClose as Off  } from "react-icons/io";

export default function AutoMonthSwitch({labelText, value, onChange}) {

    const handleClick = () => onChange(!value);
    
    const activeClassName = 'text-accentStrong dark:text-dark-accentStrong';
    const inactiveClassName = 'text-baseColor dark:text-baseColor';
    return (
        <div className=' mb-2'>
            <Label text={labelText}/>
            <Switch onClick={handleClick} initial={value} className=' relative'>
                <Off className={`absolute left-3 ${value? activeClassName : inactiveClassName}`}/>            
                <On className={`absolute right-3 ${value? inactiveClassName : activeClassName}`}/>
            </Switch>
        </div>
    )

}
