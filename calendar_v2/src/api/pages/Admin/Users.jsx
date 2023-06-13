import {useState } from "react";
import {motion as m} from 'framer-motion';

import User from "../../components/user/User";
import Accordion from "../../components/ui/Accordion";


export default function Users({items, setMessage, updateAll}) {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => setSearch(event.target.value);

  

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  //slot example
//   {
//     "calendar": "Środa Wielkopolska",
//     "date": "MAJ.2023",
//     "weekIndex": 0,
//     "day": "CZWARTEK",
//     "time": "12:00",
//     "slotName": "Oficjalne",
//     "slotIndex": 1,
//     "sign": "Bartosz Jakubowski"
// }

  // const user = 
  // {
  //   Name:
  //   Mail:
  //   Permissions: 
  //   Records
  // }

  const variantsForUsers = 
  {
        hidden: { opacity: 0, y: -200},
        enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
        exit: { opacity: 0, x: 0, y: -100},
  }
  return (
    <m.div className="w-full h-full overflow-hidden pb-20 bg-blue-300" variants={variantsForUsers} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
      <div className=" w-full h-14 md:h-20 bg-white border-x border-b-blue-300 border-b border-blue-300 flex flex-col ">
        <label className="text-slate-600 ml-2 mt-2 sticky">
          Wyszukaj użytkownika
        </label>
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="border-2 border-slate-200 w-80 ml-2 focus:border-slate-400 text-slate-600 focus:outline-none"
        />
      </div>
      <div className="overflow-y-scroll h-full">
        {filteredItems.map((item, index) => 
        {
          return (
              <Accordion
              label={item.name}
              content={<User item={item} setMessage={setMessage} updateAll={updateAll}/>}
              key={index}
              search={search}
      />
          )
        }
      )}
      </div>
      <p className="flex w-full justify-center items-start font-bold text-1xl">-</p>
    </m.div>
  );
}