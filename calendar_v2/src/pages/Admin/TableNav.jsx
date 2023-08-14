import { motion as m } from "framer-motion";
import Ping from "@/components/ui/Ping";

export default function TableNav({currentPage, setCurrentPage, links, usersRegister, usersPassword}) {



 const matchCurrentLink = (link) => {
    return links.indexOf(link) === currentPage;
 }


  return (
    <header className="sticky top-0 w-full h-14 z-10 pt-2 md:pb-20 bg-accentLight dark:bg-dark-accentLight">
      <nav className="flex flex-row gap-2 justify-center relative 2xl:mx-[15%]">
        <span className="border-b border-black absolute w-10/12 -bottom-3 left-1/2 -translate-x-1/2" />
        <ul className="flex gap-2">
          {links.map((link, index) => {
            return (
              <li key={link} onClick={() => setCurrentPage(index)} className={`relative cursor-pointer`}>
                  <div className="flex flex-col items-center">
                    <h3 className={`${matchCurrentLink(link)? 'text-accentStrong dark:text-dark-accentStrong' : 'text-black' } transition-colors duration-200 relative`}>
                      {link}
                      {index == 1 && usersRegister && usersRegister.length !=0? <Ping/> :false}
                      {index == 2 && usersPassword && usersPassword.length !=0? <Ping/> :false}
                    </h3>
                    {matchCurrentLink(link)  && (
                      <m.span
                        layoutId="underline"
                        className="absolute left-0 top-full block h-[1px] w-full bg-accentStrong dark:bg-dark-accentStrong"
                      />
                    )}
                  </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}