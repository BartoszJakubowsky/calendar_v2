import {useEffect, useMemo, useState } from "react";
import { useTransition, animated} from 'react-spring';
import useSlots from '../../hooks/useSlots';
import useCalendars from "../../hooks/useCalendars";
import { calcLength } from "framer-motion";
import useAuthentication from "../../hooks/useAuthentication";

export default function DaySlot({_thisSlot, dayDate}) 
{


  const {updateSlot, updateSlotsArray, emitMessage} = useSlots();
  const [thisSlot, setThisSlot] = useState(_thisSlot);
  const {user} = useAuthentication();
  const {setMessage} = useCalendars();
  useMemo(()=>
  {
    _thisSlot.handleSign = setThisSlot;
    updateSlotsArray([_thisSlot]);
  },[])

    const {setConfirm} = useCalendars();
    const sign = thisSlot.sign;
    // const thisSlot = 
    // {
    //     calendar : calendarName,
    //     date,
    //     weekIndex,
    //     day : dayName,
    //     time,
    //     slotName,
    //     slotIndex,
    //     handleSign: handleSign,
    //     sign:,
    // };

const handleClick = event =>
{
    event.preventDefault();

    //unsign
    if (sign === user.name)
    {
        const message = `Czy na pewno chcesz wypisać się z dnia ${thisSlot.day.toLowerCase()} ${dayDate}, godzina ${thisSlot.time}?`
        const submit = "Wypisz mnie"    
        setConfirm({message : message, submit : submit, handleSubmit : handleUnsignClick})
        // handleUnsignClick(true);

    }
    //sign
    else
    {
        const message = `Czy na pewno chcesz zapisać się na ${thisSlot.time} w ${thisSlot.day.toLowerCase()} ${dayDate}?`
        const submit = "Zapisz mnie"
        setConfirm({message : message, submit : submit, handleSubmit : handleSignClick})
        // handleSignClick(true);

    }
}

const handleSignClick = (confirmed) =>
{

    if (!confirmed)
        return

    const newSlot = {...thisSlot, sign: user.name}
    handleSign(newSlot);
}

const handleUnsignClick = (confirmed) =>
{
    if (!confirmed)
        return

        const newSlot = {...thisSlot, sign: ''}
        handleSign(newSlot);
        setMessage('Zostałeś wypisany!')
}

const handleSign = newSlot =>
{
      emitMessage(newSlot);
      setMessage('Zostałeś zapisany!')
      setThisSlot(newSlot);


        // setSign(newSlot.sign);
}

const duration = 300;
const defaultStyle = {
  opacity: 0,
  transform: 'translateX(-50%)',
  display: 'inline-block',
};
const transitionStyles = {
  entering: { opacity: 1, transform: 'translateX(0)' },
  entered: { opacity: 1, transform: 'translateX(0)' },
  exiting: { opacity: 0, transform: 'translateX(-50%)' },
  exited: { opacity: 0, transform: 'translateX(-50%)' },
};

  const transitions = useTransition(sign !== '', {
    from: defaultStyle,
    enter: transitionStyles.entering,
    leave: transitionStyles.exiting,
    config: {
      duration,
    },
  });

  return (
    <button
      className={`overflow-hidden w-full h-full border-[1px] border-gray-400 duration-150 hover:backdrop-brightness-90 text-center active:bg-zinc-200
        ${sign === '' ? '' : ''}
        ${sign !== user.name && sign !== '' ? 'cursor-not-allowed pointer-events-none' : ''}
      `}
      onClick={handleClick}
    >
      {transitions((style, item) =>
        item && (
          <animated.span style={style}>
            {sign}
          </animated.span>
        )
      )}
    </button>
  );

}

// const tempCalendar = 
// {
//     name: 'Środa Wielkopolska', 
//     date: ['KWIECIEŃ.2023', 'MAJ.2023', 'CZERWIEC.2023', 'LIPIEC.2023'], 
//     time: {timeFrom: '08:00', timeTo: '16:00', timeSpace: '01:00'}, 
//     slots: 
//     [
//         {name: 'Oficjalne', space: '2', order: 1},
//         {name: 'Nieoficjalne', space: '2', order: '2'}
//     ]
// }

// const tempSigned = 
// {
//     calendarName : name,
//     month: date,
//     day: thisDay,
//     time: thisTime,
//     slotName: slot.name,
//     slotSpace: slot.space.slotSpace
// }
// slot = [name, order, space]
// // const [slots, setSlots] = 



