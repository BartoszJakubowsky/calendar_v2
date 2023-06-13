import classNames from "classnames";

export default function MonthNavbar({displayedMonth,setDisplayedMonth, monthsCountForMonthCarousel}) 
{

    const handleShowPrevMonthClick = () => {
        setDisplayedMonth((displayedMonth - 1 + monthsCountForMonthCarousel) % monthsCountForMonthCarousel);
      };
    
    const handleShowNextMonthClick = () => {
        setDisplayedMonth((displayedMonth + 1) % monthsCountForMonthCarousel);
      };

    return (
        <div className="bg-zinc-300 w-full h-10 flex justify-start sticky top-0 z-10 font-semibold">
        <button
          className={classNames(
              "py-2 px-4  text-white md:w-fit w-full ",
              displayedMonth === 0 ? "bg-gray-500 cursor-default" : "bg-purple-400 hover:bg-purple-500 cursor-pointer"
          )}
          onClick={handleShowPrevMonthClick}
          disabled={displayedMonth === 0}
          >
          Poprzedni miesiąc
          </button>
          <button
          className={classNames(
              "py-2 px-4 md:rounded-r-md text-white md:w-fit w-full",
              displayedMonth === monthsCountForMonthCarousel - 1 ? "bg-gray-500 cursor-default" : "bg-purple-400 hover:bg-purple-500 cursor-pointer"
          )}
          onClick={handleShowNextMonthClick}
          disabled={displayedMonth === monthsCountForMonthCarousel - 1}
          >
          Następny miesiąc
          </button>
          </div>
    )    
}